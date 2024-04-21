import * as fs from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";

async function compileScript() {
  console.log(
    "Compile scrupt is running, let's find some FunC code to compile..."
  );

  const compileResult = await compileFunc({
    targets: ["./contracts/main.fc"],
    sources: (x) => fs.readFileSync(x).toString("utf-8"),
  });
  if (compileResult.status === "error") {
    console.log(`Compilation error: ${compileResult.message}`);
    process.exit(1);
  }

  console.log("Compilation was successful");

  const hexArtifiact = "build/main.compiled.json";
  fs.writeFileSync(
    hexArtifiact,
    JSON.stringify({
      hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
        .toBoc()
        .toString("hex"),
    })
  );

  console.log("Compiled code was saved to " + hexArtifiact);
}

compileScript();
