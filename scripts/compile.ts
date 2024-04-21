import * as fs from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";

async function compileScript() {
  const compileResult = await compileFunc({
    targets: ["./contracts/main.fc"],
    sources: (x) => fs.readFileSync(x).toString("utf-8"),
  });

  Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
    .toBoc()
    .toString("hex");

  if (compileResult.status === "error") {
    process.exit(1);
  }
}

compileScript();
