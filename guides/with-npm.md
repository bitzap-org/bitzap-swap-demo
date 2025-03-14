# Swap With Contract

## Contract Address

测试网router合约
<https://testnet.btrscan.com/address/0x60fddc55f2e2111703f4c415730576ac908824c6?tab=Contract>
主网router合约
<https://www.btrscan.com/address/0x2cbb1b267acbdbe62ef844bb3814146f5cd46918?tab=Contract>

## Frontend api

```
import bitzap from "bitzap-api";


const init = async () => {
  const connectorId = sessionStorage.getItem('connector_id')
  const _connector: any = connectors.find((connector: any) => connector.id === connectorId)
  const _provider = await _connector.getProvider()

  if (account.status === 'connected' && _provider) {
    bitzap.init("Web3", { externalProvider: _provider }, { chainId: bitlayerTestnet.id })

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


const onSwap = async () => {
  const { route, output } = await bitzap.router.getBestRouteAndOutput('USDT', 'USDC', '1');
  setResultHash(result.hash)
  window.setTimeout(() => {
    refreshBalances()
  }, 600)
}

useEffect(() => {
  init()
}, [account, connectors]);


<Button onClick={onSwap}>
  Swap
</Button>

```
