import { useAccount, useConnect, useSignMessage, useWriteContract } from 'wagmi';
import { Button, Card, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { TXLink } from './IconLink';
import bitzap from "bitzap-api";
import { bitlayerTestnet } from 'wagmi/chains';
import { getTokenIcon } from '@/utils';
import { USDC_ADDRESS, USDT_ADDRESS } from '@/constants';

interface Props {
  balances: string[],
  refreshBalances: () => void
}

const WithNpm = ({ balances, refreshBalances }: Props) => {
  const { writeContractAsync } = useWriteContract()
  const inputToken = "0x67d4b8c97cf54539c1e80767201b5571e831342a"; // USDT 输入代币地址
  const outputToken = "0x40b45d6d774a0cc6eec380ed55528f3c9edb1e2c"; // USDC 输出代币地址
  const [inputAmount, setInputAmount] = useState('1')
  const [outputAmount, setOutAmount] = useState('1.361413')
  const [resultHash, setResultHash] = useState('')

  const account = useAccount()
  const { connectors } = useConnect()

  const init = async () => {
    const connectorId = sessionStorage.getItem('connector_id')
    const _connector: any = connectors.find((connector: any) => connector.id === connectorId)
    const _provider = await _connector.getProvider()

    if (account.status === 'connected' && _provider) {
      bitzap.init("Web3", { externalProvider: _provider }, { chainId: bitlayerTestnet.id })

      // const tvl = await bitzap.getTVL()
      // 

      await bitzap.factory.fetchPools();
      await bitzap.crvUSDFactory.fetchPools();
      await bitzap.EYWAFactory.fetchPools();
      await bitzap.cryptoFactory.fetchPools();
      await bitzap.twocryptoFactory.fetchPools();
      await bitzap.tricryptoFactory.fetchPools();
      await bitzap.stableNgFactory.fetchPools();

      refreshBalances();
    }
  }

  // const refreshBalances = async () => {
  //   const _balances: any = await bitzap.getBalances(['USDT', 'USDC']);
  //   setBalances(_balances)
  // }

  const onSwap = async () => {
    const { route, output } = await bitzap.router.getBestRouteAndOutput('USDT', 'USDC', '1');
    // OR await bitzap.router.getBestRouteAndOutput('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
    // const expected = await bitzap.router.expected('DAI', 'CRV', '1000');
    // OR await bitzap.router.expected('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
    // const required = await bitzap.router.required('DAI', 'CRV', expected);
    // OR await bitzap.router.required('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', expected);
    // const priceImpact = await bitzap.router.priceImpact('DAI', 'CRV', '1000');
    // OR await bitzap.router.priceImpact('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
    // const args = bitzap.router.getArgs(route);
    const result: any = await bitzap.router.swap('USDT', 'USDC', '1', 0.003)
    // console.log('result', result)
    setResultHash(result.hash)

    window.setTimeout(() => {
      refreshBalances()
    }, 600)
  }

  useEffect(() => {
    init()
  }, [account, connectors]);

  return (
    <Card>
      <h2 style={{ marginBottom: '20px' }}>Swap by NPM</h2>
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
          <Flex>
            <div>{resultHash}</div>
            <TXLink hash={resultHash} />
          </Flex>
        </Flex>
        <Button onClick={onSwap}>
          Swap
        </Button>
      </Flex>
    </Card>
  );
};

export default WithNpm;