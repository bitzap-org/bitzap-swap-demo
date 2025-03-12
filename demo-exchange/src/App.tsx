import { useAccount, useDisconnect } from 'wagmi'
import { Flex, Text, Button, Card } from "@radix-ui/themes";
import ConnectWallet from './components/ConnectWallet';
import TokenExchange from './components/TokenExchange';
import BitZapExchange from './components/BitZapExchange';

function App() {
  const account = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className='max-w-5xl mx-auto my-10'>
      <Flex direction="column" gap="2">
        <Card>
          <Text>Account</Text>

          <Flex gap={"2"}>
            <Text>Status: {account.status}</Text>
            <Text>Addresses: {JSON.stringify(account.addresses)}</Text>
            <Text>ChainId: {account.chainId}</Text>
          </Flex>
          {account.status === 'connected'
            ? (
              <Button type="button" onClick={() => disconnect()}>
                Disconnect
              </Button>
            )
            : <ConnectWallet />
          }
        </Card>

        <TokenExchange />

        <BitZapExchange />
      </Flex>
    </div>
  )
}

export default App
