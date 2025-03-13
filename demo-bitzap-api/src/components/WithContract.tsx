import { useAccount, useBalance, useConnect, useSignMessage, useWriteContract } from 'wagmi';
import curveRouterABI from '../abis/router.json'; // 替换为实际的 ABI 文件路径
import { Button, Card, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { TXLink } from './IconLink';
import { parseUnits } from 'viem';
import { USDC_ADDRESS, USDT_ADDRESS } from '@/constants';
import { getTokenIcon } from '@/utils';

interface Props {
  balances: string[],
  refreshBalances: () => void
}

const WithContract = ({ balances, refreshBalances }: Props) => {
  const account = useAccount()
  const { connectors } = useConnect()
  const { writeContractAsync } = useWriteContract()
  const inputToken = "0x67d4b8c97cf54539c1e80767201b5571e831342a"; // USDT 输入代币地址
  const outputToken = "0x40b45d6d774a0cc6eec380ed55528f3c9edb1e2c"; // USDC 输出代币地址
  const [inputAmount, setInputAmount] = useState('1')
  const [outputAmount, setOutAmount] = useState('1.361413')
  const [resultHash, setResultHash] = useState('')


  const handleExchange = async () => {

    try {
      const amountIn = parseUnits(inputAmount, 6); // 输入代币数量
      const minAmountOut = parseUnits(outputAmount, 6); // 最小输出代币数量

      const result = await writeContractAsync({
        abi: curveRouterABI,
        address: '0x60fddc55f2e2111703f4c415730576ac908824c6',
        functionName: 'exchange',
        args: [
          [
            inputToken,
            "0x5f3f837cbd78e6531e2aa519c57a8402682da4c7",
            "0x6aa07f6e5a9bb4952228db4335bb03ad4825b56f",
            "0xe576c86676ea75376a888b13f436312d5897e30f",
            outputToken,
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
          ],
          [
            [0, 1, 1, 20],
            [0, 1, 1, 20],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          amountIn,
          minAmountOut,
        ],
      })
      setResultHash(result)
      console.log('result:', result);
      window.setTimeout(() => {
        refreshBalances()
      }, 600)
    } catch (error) {
      console.error('swap-failed:', error);
    }
  };

  return (
    <Card>
      <h2 style={{ marginBottom: '20px' }}>Router Token Exchange</h2>
      <Flex direction={'column'} gap={'4'}>
        <div>
          <Flex>
            <Flex style={{ width: '100px' }} align={'center'} gap="1">
              <img src={getTokenIcon(USDT_ADDRESS)} style={{ width: '20px', height: '20px' }} />
              USDT:
            </Flex>
            <input
              type="text"
              placeholder="USDT Amount"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              style={{ flex: 1 }}
            />
          </Flex>
          <Flex>Balance: {balances[0]}</Flex>
        </div>
        <div>
          <Flex>
            <Flex style={{ width: '100px' }} align={'center'} gap="1">
              <img src={getTokenIcon(USDC_ADDRESS)} style={{ width: '20px', height: '20px' }} />
              USDC:
            </Flex>
            <input
              type="text"
              placeholder="USDC Amount"
              value={outputAmount}
              onChange={(e) => setOutAmount(e.target.value)}
              style={{ flex: 1 }}
            />
          </Flex>
          <Flex>Balance: {balances[1]}</Flex>
        </div>
        <Flex align="center">
          <span>Hash: </span>
          <Flex align={'center'}>
            <div>{resultHash}</div>
            <TXLink hash={resultHash} />
          </Flex>
        </Flex>
        <Button onClick={handleExchange}>
          Swap
        </Button>
      </Flex>
    </Card>
  );
};

export default WithContract;