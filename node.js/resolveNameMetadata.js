//Imports
import { ethers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils.js";
import { selfNftAbi } from "./selfNftAbi.js";
import { createGatewayLink } from "./helpers.js";

//Constants
const SELF_NFT_ADDRESS = "0x125Bb13F77f3565d421bD22e92aaFfC795D97a72";
const BSC_RPC_URL = "https://bsc.publicnode.com";
const NAME_TO_RESOLVE = "papajohns";

const provider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL);

async function main() {
  //Hash the name
  const hashedName = BigInt(keccak256(toUtf8Bytes(NAME_TO_RESOLVE))).toString();

  //Create contract object
  const contract = new ethers.Contract(SELF_NFT_ADDRESS, selfNftAbi, provider);

  //Get token uri
  const tokenUri = await contract.tokenURI(hashedName);

  try {
    //Create gatewaylink
    const gatewayLink = createGatewayLink(tokenUri);

    //fetch metadata
    const metadata = await (await fetch(gatewayLink)).json();

    //log metadata
    console.log("Metadata:", metadata);
  } catch (error) {
    console.log("Invalid metadata.", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
