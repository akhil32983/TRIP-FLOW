import "@testing-library/jest-dom";
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});
