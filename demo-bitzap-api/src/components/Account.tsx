import { Button, Flex, Text } from '@radix-ui/themes';
import { useAccount, useChainId, useDisconnect, useEnsName } from 'wagmi'
import ConnectWallet from './ConnectWallet';
import { shortenAddress } from '@/constants';

export default function Account() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  return (
    <Flex justify="between" align="center" style={{padding: '20px 0'}}>
      <Text size="6" weight={"bold"}>Account</Text>

      <Flex gap={"4"} align="center">
        <Text>Addresses: {address? shortenAddress(address || '') : '-'}</Text>
        <Text>ChainId: {chainId}</Text>
        {isConnected
        ? (
          <Button type="button" onClick={() => disconnect()}>
            Disconnect
          </Button>
        )
        : <ConnectWallet />
      }
      </Flex>
    </Flex>
  )
}