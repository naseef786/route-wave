"use client";

import React, { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export function TurnstileWidget({
  onVerify,
  onError,
  onExpire,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const rawSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isDev = process.env.NODE_ENV !== "production";
  const isBypass = isDev || !rawSiteKey || rawSiteKey === "1x00000000000000000000AA";
  const siteKey = rawSiteKey || "";

  useEffect(() => {
    if (isBypass) {
      onVerify("test-token");
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[src*="turnstile/v0/api.js"]'
    );

    const initWidget = () => {
      if (
        window.turnstile &&
        containerRef.current &&
        !widgetIdRef.current &&
        containerRef.current.childElementCount === 0
      ) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerify(token);
            },
            "error-callback": () => {
              if (onError) onError();
            },
            "expired-callback": () => {
              if (onExpire) onExpire();
            },
            theme: "light",
            size: "flexible",
          });
        } catch {
          // Ignore render collisions
        }
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initWidget();
      };
      document.head.appendChild(script);
    } else {
      if (window.turnstile) {
        initWidget();
      } else {
        script.addEventListener("load", initWidget);
      }
    }

    const containerEl = containerRef.current;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
      if (containerEl) {
        containerEl.innerHTML = "";
      }
    };
  }, [siteKey, onVerify, onError, onExpire]);

  if (isBypass) {
    return null;
  }

  return (
    <div className="py-2 max-w-full overflow-hidden">
      <div ref={containerRef} className="min-h-[65px] max-w-full overflow-hidden" />
    </div>
  );
}
