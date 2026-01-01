"use client";

import Script from "next/script";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface ReCaptchaProviderProps {
  children: React.ReactNode;
  siteKey: string;
}

export default function ReCaptchaProvider({
  children,
  siteKey,
}: ReCaptchaProviderProps) {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}

export async function executeRecaptcha(
  siteKey: string,
  action: string = "submit"
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action })
        .then((token: string) => {
          resolve(token);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  });
}

