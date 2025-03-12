import { Button, Dialog, Flex, Inset } from '@radix-ui/themes';
import { useConnect } from 'wagmi';

export default function ConnectWallet() {
  const { connectors, connect, status, error } = useConnect()

  const onConnect =  (connector: any) => {
    sessionStorage.setItem('connector_id', connector.id)
    connect({ connector })
  }

  return (<Dialog.Root>
    <Dialog.Trigger>
      <Button>Connect Wallet</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Title>Connect Wallet</Dialog.Title>
      <Dialog.Description>
        Please select a wallet to connect.
      </Dialog.Description>

      <Inset side="x" my="5">
        <div className='px-10'>
          <Flex gap="3">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={()=>onConnect(connector)}
                type="button"
              >
                {connector.name}
              </Button>
            ))}
          </Flex>
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      </Inset>

      <Flex gap="3" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Close
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>)

}