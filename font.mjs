// copy fonts directory from node_modules to dist

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fontawesomeSrc = path.resolve(
  __dirname,
  "node_modules/@fortawesome/fontawesome-free/webfonts",
);

const bootstrapiconsSrc = path.resolve(
  __dirname,
  "node_modules/bootstrap-icons/font/fonts",
);
const dest = path.resolve(__dirname, "public/assets/webfonts");

fs.mkdir(dest, { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(fontawesomeSrc, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(fontawesomeSrc, file),
        path.join(dest, file),
        (err) => {
          if (err) throw err;
          console.log(`Copied ${file}`);
        },
      );
    });
  });

  fs.readdir(bootstrapiconsSrc, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(bootstrapiconsSrc, file),
        path.join(dest, file),
        (err) => {
          if (err) throw err;
          console.log(`Copied ${file}`);
        },
      );
    });
  });
});
