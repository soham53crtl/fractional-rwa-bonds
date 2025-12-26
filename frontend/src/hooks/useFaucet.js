import { useWriteContract } from 'wagmi';
import { STABLECOIN_ADDRESS, STABLECOIN_ABI } from '../constants';
import { parseUnits } from 'viem';

export function useFaucet() {
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const requestTokens = (address) => {
    writeContract({
      address: STABLECOIN_ADDRESS,
      abi: STABLECOIN_ABI,
      functionName: 'faucet',
      args: [address, parseUnits("1000", 18)], // Gives 1000 mUSDC
    });
  };

  return { requestTokens, isPending, isSuccess };
}