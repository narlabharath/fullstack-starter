import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  outfile: "dist/main.js",
  minify: true,
  sourcemap: true,
}).catch(() => process.exit(1));
