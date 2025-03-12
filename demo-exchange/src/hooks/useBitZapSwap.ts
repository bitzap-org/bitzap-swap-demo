import { useAccount, useChainId, useConnectors } from 'wagmi';
import curve from 'bitzap-api';
import { useEffect, useState } from 'react';
import { EIP1193Provider } from 'viem';
// import { BrowserProvider } from 'ethers';

const useBitZapSwap = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const connectors = useConnectors();
  const [isApproved, setIsApproved] = useState(false);

  const init = async () => {
    // const browserProvider = new BrowserProvider(window.ethereum);
    const connectorId = sessionStorage.getItem('connector_id');
    const connector = connectors.find(
      (connector) => connector.id === connectorId
    );
    const provider = (await connector.getProvider()) as EIP1193Provider;
    console.log(4444, 'provider', provider);

    console.log(5555, 'curve:', curve)
    // await curve.init(
    //   'Web3',
    //   { network: chainId, externalProvider: provider as EIP1193Provider },
    //   { chainId }
    // );
    // await bitzap.factory.fetchPools();
    // await bitzap.crvUSDFactory.fetchPools();
    // await bitzap.EYWAFactory.fetchPools();
    // await bitzap.cryptoFactory.fetchPools();
    // await bitzap.twocryptoFactory.fetchPools();
    // await bitzap.tricryptoFactory.fetchPools();
    // await bitzap.stableNgFactory.fetchPools();

    // bitzap.hasRouter();
    // true

    // const balances = await bitzap.getBalances(['USDT', 'USDC']);
    // console.log('balances: ', balances);
    // [ '9900.0', '100049.744832225238317557' ]

    // const { route, output } = await bitzap.router.getBestRouteAndOutput(
    //   'USDT',
    //   'USDC',
    //   '1000'
    // );
    // // OR await bitzap.router.getBestRouteAndOutput('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
    // const expected = await bitzap.router.expected('USDT', 'USDC', '1000');
    // // OR await bitzap.router.expected('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
    // const required = await bitzap.router.required('USDT', 'USDC', expected);
    // // OR await bitzap.router.required('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', expected);
    // const priceImpact = await bitzap.router.priceImpact('USDT', 'USDC', '1000');
    // // OR await bitzap.router.priceImpact('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
    // const args = bitzap.router.getArgs(route);

    // console.log(route, output, expected, required, priceImpact, args);

    // const _isApproved = await bitzap.router.isApproved('USDT', 1000);
    // setIsApproved(_isApproved);
    // console.log('_isApproved:', _isApproved);
    // false

    // await bitzap.router.approve('USDT', 1000);
    // [
    //     '0xc111e471715ae6f5437e12d3b94868a5b6542cd7304efca18b5782d315760ae5'
    // ]
  };

  // const onApprove = async () => {
  //   await bitzap.router.approve('USDT', 1000);
  //   // [
  //   //     '0xc111e471715ae6f5437e12d3b94868a5b6542cd7304efca18b5782d315760ae5'
  //   // ]
  //   const _isApproved = await bitzap.router.isApproved('USDT', 1000);
  //   setIsApproved(_isApproved);
  //   console.log('_isApproved:', _isApproved);
  // };

  // const onSwap = async () => {
  //   if (!isApproved) {
  //     await onApprove();
  //   }
  //   const swapTx = await bitzap.router.swap('USDT', 'USDC', '1000');
  //   // OR const swapTx = await bitzap.router.swap('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xD533a949740bb3306d119CC777fa900bA034cd52', '1000');
  //   console.log(swapTx.hash);
  //   // 0xc7ba1d60871c0295ac5471bb602c37ec0f00a71543b3a041308ebd91833f26ba
  //   const swappedAmount = await bitzap.router.getSwappedAmount(swapTx, 'CRV');
  //   console.log('swappedAmount', swappedAmount);
  //   // 1573.668171170839785062

  //   await bitzap.getBalances(['USDT', 'USDC']);
  //   // [ '8900.0', '100428.626463428100672494' ]
  // };

  useEffect(() => {
    if (address && chainId) {
      init();
    }
  }, [chainId, address]);

  return {
    // onSwap,
  };
};

export default useBitZapSwap;
