import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
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
      globals: {
        // bootstrap: "bootstrap"
      },
    },
    // external: ['bootstrap'],
    plugins: [
      replace({
        "process.env.NODE_ENV": '"production"',
        preventAssignment: true,
      }),
      nodeResolve(),
    ],
  },
  {
    input: "src/js/core/core.js",
    output: {
      file: "dist/core.esm.js",
      format: "es",
      banner,
      //       globals: {
      //         bootstrap: "bootstrap"
      //       }
    },
    //     external: ['bootstrap'],
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
