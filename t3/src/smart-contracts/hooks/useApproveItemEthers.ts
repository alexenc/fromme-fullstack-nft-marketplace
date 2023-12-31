
import { addresses, NFTFactory_abi } from "../constants";
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider & { enable: () => Promise<void> };
  }
}

export default async function useApproveItem(tokenId: number) {
  try {

    const providerUrl = process.env.NEXT_PUBLIC_URL_MUMBAI;
    console.log('providerUrl', providerUrl)

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(addresses.NFTFactory, NFTFactory_abi, signer) as ethers.Contract & { approve: (addresses: string, tokenId: number) => Promise<string> };

    async function callContractFunction() {
      try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
          throw new Error('MetaMask is not installed'); 
        }
    
        // Request access to the user's MetaMask accounts
        await window.ethereum.enable();
    
        // Perform the contract function call
        const result = await contract.approve(addresses.FrommeMarketplace, tokenId);
    
        // Process the result
        console.log('Contract function called:', result);
      } catch (error) {
        console.error('Error calling contract function:', error);
      }
    }
    await callContractFunction();
  } catch (error) {
    console.error('Error reading getApproved of token:', error);
    throw error;
  }
}
