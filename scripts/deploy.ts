import { address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const codeCell = await compile("MainContract");

  const myContract = MainContract.createFromConfig(
    {
      number: 0, //initial value of counter
      address: address("kQDU69xgU6Mj-iNDHYsWWuNx7yRPQC_bNZNCpq5yVc7LiE7D"),
      owner_address: address(
        "EQBU1O2Cx_qL3cY9eHXNYhVWeW0oXGB5b8HdyzN3s76Tf09z"
      ),
    },
    codeCell
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}

// import {
//   Cell,
//   StateInit,
//   beginCell,
//   contractAddress,
//   storeStateInit,
//   toNano,
// } from "@ton/core";
// import { hex } from "../build/main.compiled.json";
// import qs from "qs";
// import qrcode from "qrcode-terminal";
// import dotenv from "dotenv";
// dotenv.config();

// async function deployScript() {
//   console.log("Deploy script is running");

//   const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];

//   const dataCell = new Cell();

//   const stateInit: StateInit = {
//     code: codeCell,
//     data: dataCell,
//   };

//   const stateInitBuilder = beginCell();
//   storeStateInit(stateInit)(stateInitBuilder);
//   const stateInitCell = stateInitBuilder.endCell();

//   const address = contractAddress(0, {
//     code: codeCell,
//     data: dataCell,
//   });

//   console.log(`The address of the contract ${address.toString()}`);
//   console.log(
//     `Please scan qr to deploy on ${
//       process.env.TESTNET ? "testnet" : "mainnet"
//     }: `
//   );

//   let link =
//     `https://${process.env.TESTNET ? "test." : ""}tonhub.com/transfer/` +
//     address.toString({
//       testOnly: process.env.TESTNET ? true : false,
//     }) +
//     "?" +
//     qs.stringify({
//       text: "Deploy contract",
//       amount: toNano(0.05).toString(10),
//       init: stateInitCell.toBoc({ idx: false }).toString("base64"),
//     });

//   qrcode.generate(link, { small: true }, (code) => {
//     console.log(code);
//   });
// }

// deployScript();
