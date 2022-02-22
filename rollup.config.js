import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const banner = `/**
 * ${pkg.name} - ${pkg.description}
 * @version ${pkg.version}
 * @license ${pkg.license}
 * @link ${pkg.homepage}
 */
`;

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/js/core/core.js",
    output: {
      dir: production ? "dist" : "public/assets/js",
      format: "iife",
      banner,
    },
    plugins: [nodeResolve()],
  },
  {
    input: "src/js/app/app.js",
    output: {
      dir: production ? "dist" : "public/assets/js",
      format: "iife",
      banner,
    },
  },
];
