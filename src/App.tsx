import { useEffect, useState } from "react";
import { getBrowserWindow, getFleekDashSdk } from "@fleekdash/contracts";
import type { FleekDashSdk } from "@fleekdash/contracts";

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
  const [posts, setPosts] = useState<WpPost[]>([]);
  const embedded = isFleekDashEmbedded();

  useEffect(() => {
    let active = true;
    const instance = getFleekDashSdk();
    if (!instance) {
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
      .catch(() => {});

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

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 24,
        height: "100%",
        overflow: "auto",
        background: "var(--background, transparent)",
        color: "var(--foreground, inherit)",
      }}>
      <h1 style={{ marginTop: 0 }}>{welcomeText || "Extension Starter"}</h1>
      <p>
        kind: <code>app</code> - embedded: {String(embedded)} - theme:{" "}
        {isDark ? "dark" : "light"} - SDK v{sdk?.getVersion() ?? "n/a"}
      </p>

      <h2>Latest posts (via FleekDashSDK.getWordPressData)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title?.rendered ?? `#${post.id}`}</li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          sdk?.showNotification("Hello from the starter!", "success");
        }}>
        showNotification() demo
      </button>
    </div>
  );
}
