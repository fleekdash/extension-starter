import { useEffect, useState } from "react";
import { getBrowserWindow, getFleekDashSdk } from "@fleekdash/contracts";
import type { FleekDashSdk } from "@fleekdash/contracts";
import { Badge, Button, Icon, Skeleton } from "@fleekdash/design-system";

const INTEGRATION_ID = "extension-starter";

function isFleekDashEmbedded(): boolean {
  try {
    return globalThis.parent !== globalThis.window;
  } catch {
    return false;
  }
}

type WpPost = { id: number; title?: { rendered?: string } };

export function App() {
  const [sdk, setSdk] = useState<FleekDashSdk | undefined>();
  const [isDark, setIsDark] = useState(() => {
    try {
      return (
        getBrowserWindow()?.localStorage.getItem("fleekdash-dark-mode") ===
        "true"
      );
    } catch {
      return false;
    }
  });
  const [welcomeText, setWelcomeText] = useState("");
  const [posts, setPosts] = useState<WpPost[] | undefined>();
  const [notifying, setNotifying] = useState(false);
  const embedded = isFleekDashEmbedded();

  useEffect(() => {
    let active = true;
    const instance = getFleekDashSdk();
    if (!instance) {
      setPosts([]); // standalone: render the empty state, not an endless skeleton
      return;
    }
    setSdk(instance);

    instance.init({
      integration_id: INTEGRATION_ID,
      debug: true,
      deferReady: embedded,
    });

    // Host theme changes arrive as THEME_CHANGED after the SDK applies them.
    const offTheme = instance.onMessage("THEME_CHANGED", (data) => {
      if (typeof data.isDarkMode === "boolean") {
        setIsDark(data.isDarkMode);
      }
    });

    // Demo: read this extension's settings field (welcome_text).
    instance
      .getIntegrationSettings()
      .then((settings) => {
        const value = settings?.welcome_text;
        if (active && typeof value === "string") {
          setWelcomeText(value);
        }
      })
      .catch(() => {});

    // Demo: WordPress REST through the host-authenticated channel.
    instance
      .getWordPressData("/wp/v2/posts", { per_page: 5 })
      .then((data) => {
        if (active && Array.isArray(data)) {
          setPosts(data as WpPost[]);
        }
      })
      .catch(() => {
        if (active) setPosts([]);
      });

    if (embedded) {
      instance.reportReady().catch(() => {
        // Non-blocking - host may be slower than the iframe boot.
      });
    }

    return () => {
      active = false;
      offTheme();
    };
  }, [embedded]);

  const notify = () => {
    if (!sdk) {
      return;
    }
    setNotifying(true);
    sdk
      .showNotification("Hello from the starter!", "success")
      .finally(() => setNotifying(false));
  };

  return (
    <div className="fleek-ui bg-background text-foreground h-full overflow-auto p-6 font-sans">
      <div className="mb-1 flex items-center gap-2">
        <Icon name="sparkles" className="text-primary size-5" />
        <h1 className="m-0 text-xl font-semibold">
          {welcomeText || "Extension Starter"}
        </h1>
      </div>
      <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
        <Badge variant="primary">kind: app</Badge>
        <Badge variant={embedded ? "success" : "secondary"}>
          {embedded ? "embedded" : "standalone"}
        </Badge>
        <Badge variant="secondary">
          <Icon name={isDark ? "moon" : "sun"} className="size-3.5" />
          {isDark ? "dark" : "light"}
        </Badge>
        <span>SDK v{sdk?.getVersion() ?? "n/a"}</span>
      </div>

      <h2 className="text-base font-medium">
        Latest posts (via FleekDashSDK.getWordPressData)
      </h2>
      {posts === undefined ? (
        <div className="mb-4 space-y-2">
          <Skeleton width={300} height={16} />
          <Skeleton width={280} height={16} />
          <Skeleton width={240} height={16} />
        </div>
      ) : (
        <ul className="mb-4 list-disc pl-5">
          {posts.map((post) => (
            <li key={post.id}>{post.title?.rendered ?? `#${post.id}`}</li>
          ))}
        </ul>
      )}

      <Button icon="bell" state={notifying ? "loading" : null} onClick={notify}>
        showNotification() demo
      </Button>
    </div>
  );
}
