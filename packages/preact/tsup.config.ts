import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts', // Main entry point
  ],
  format: ['esm', 'cjs'], // Output both ESM and CommonJS

  bundle: true,
  sourcemap: true,
  dts: true, // Generate TypeScript declaration files
  outDir: 'dist', // Output directory
  splitting: false, // Disable code splitting for simplicity
  clean: true, // Clean the output directory before building
});