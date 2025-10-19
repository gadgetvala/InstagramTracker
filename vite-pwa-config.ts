import type { VitePWAOptions } from "vite-plugin-pwa";

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: [
    "favicon.ico",
    "robots.txt",
    "pwa-192x192.png",
    "pwa-512x512.png",
  ],
  devOptions: {
    enabled: true,
    type: "module",
  },
  manifest: {
    name: "Instagram Tracker - Unfollower Tracker",
    short_name: "InstaTracker",
    description:
      "Track Instagram unfollowers offline. See who's not following you back with complete privacy.",
    theme_color: "#8B5CF6",
    background_color: "#0F0A1E",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/?source=pwa",
    categories: ["social", "utilities", "productivity"],
    lang: "en-US",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        form_factor: "narrow",
        label: "Instagram Tracker Home Screen",
      },
    ],
    shortcuts: [
      {
        name: "Upload Data",
        short_name: "Upload",
        description: "Upload Instagram data ZIP file",
        url: "/?shortcut=upload",
        icons: [{ src: "/pwa-192x192.png", sizes: "192x192" }],
      },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,json}"],
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true,
    navigateFallback: "/index.html",
    navigateFallbackDenylist: [/^\/api/],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "images-cache",
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/.*\.(woff|woff2|ttf|eot)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "font-cache",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};
