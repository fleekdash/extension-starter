import { debugWarn } from "./debug";
import { getBrowserWindow } from "./browser-env";

const ICONIFY_API_HOSTS = [
  "api.iconify.design",
  "api.simplesvg.com",
  "api.unisvg.com",
] as const;

type FleekDashGlobal = typeof globalThis & {
  __fleekdashIconifyFetchGuard__?: boolean;
};

/**
 * Blocks external Iconify CDN fetches (offline bundle only).
 * Installed from platform apiClient boot so production stack traces are not
 * attributed to vendor-iconify when unrelated REST calls fail.
 */
export function installIconifyFetchGuard(): void {
  const browserWindow = getBrowserWindow();
  if (!browserWindow || typeof browserWindow.fetch !== "function") {
    return;
  }

  const fleekGlobal = globalThis as FleekDashGlobal;
  if (fleekGlobal.__fleekdashIconifyFetchGuard__) {
    return;
  }
  fleekGlobal.__fleekdashIconifyFetchGuard__ = true;

  const originalFetch = browserWindow.fetch.bind(browserWindow);
  browserWindow.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    let url = "";
    if (typeof input === "string") {
      url = input;
    } else if (input instanceof URL) {
      url = input.href;
    } else {
      url = input.url;
    }

    if (ICONIFY_API_HOSTS.some((host) => url.includes(host))) {
      debugWarn("MAIN", "Blocked external Iconify fetch (use local bundle)", {
        url,
      });
      return Promise.resolve(
        new Response("{}", {
          status: 404,
          statusText: "External Iconify API disabled",
        }),
      );
    }

    return originalFetch(input, init);
  };
}
