import { formatISO } from "date-fns";
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Migration name? ", answer => {
  const name = answer.trim();

  if (!name) {
    console.log("You must provide a migration name.");
    rl.close();
    return;
  }

  const fileName = path.join(
    __dirname,
    "..",
    "migrations",
    `${formatISO(Date.now(), { format: "basic" })}_${name}.js`
  );

  const script = `export default function(file) {
  return file;
}
`;

  fs.writeFileSync(fileName, script);
  rl.close();
});
