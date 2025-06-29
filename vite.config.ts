import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "khennycool",
  project: "javascript-react",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};


export default defineConfig(config => {
  return {
  plugins: [tailwindcss(), tsconfigPaths(), reactRouter(),sentryReactRouter(sentryConfig, config)],
  ssr: {
    noExternal: [/@syncfusion/]
  }
  };
});