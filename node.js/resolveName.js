//Imports
import { ethers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils.js";
import { selfNftAbi } from "./selfNftAbi.js";

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

  //Resolve name
  const resolvedName = await contract.ownerOf(hashedName);

  console.log("ResolvedName:", resolvedName);
  //ResolvedName: 0xfF8A5C1D47D773D75E0F0eD1bA3bC62f8542e44e
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
