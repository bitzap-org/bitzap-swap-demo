'use client'

import Account from '@/components/Account';
import { Flex } from '@radix-ui/themes';
import WithContract from '@/components/WithContract';
import WithNpm from '@/components/WithNpm';
import { useAccount, useBalance } from 'wagmi';
import { useEffect } from 'react';

function App() {
  const account = useAccount()
  const inputToken = "0x67d4b8c97cf54539c1e80767201b5571e831342a"; // USDT 输入代币地址
  const outputToken = "0x40b45d6d774a0cc6eec380ed55528f3c9edb1e2c"; // USDC 输出代币地址

  const { data: USDTData, refetch: refetchUSDTBalance } = useBalance({
    address: account.address,
    token: inputToken,
  })
  const { data: USDCData, refetch: refetchUSDCBalance } = useBalance({
    address: account.address,
    token: outputToken,
  })

  const refreshBalances = async () => {
    console.log('refreshBalances');
    refetchUSDTBalance()
    refetchUSDCBalance()
  }

  useEffect(() => {
    refreshBalances()
  }, [account])

  return (
    <Flex direction="column" gap="5">
      <Account />

      <WithContract
        balances={[USDTData?.formatted || '0', USDCData?.formatted || '0']}
        refreshBalances={refreshBalances}
      />

      <WithNpm
        balances={[USDTData?.formatted || '0', USDCData?.formatted || '0']}
        refreshBalances={refreshBalances}
      />

    </Flex>
  )
}

export default App
