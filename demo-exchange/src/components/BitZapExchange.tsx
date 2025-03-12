import { Button, Card } from '@radix-ui/themes';
import useBitZapSwap from '../hooks/useBitZapSwap';

export default function BitZapExchange() {

  const { onSwap } = useBitZapSwap();
  return (
    <Card>
      <h2>BitZapExchange</h2>

      <Button onClick={onSwap}>
        Swap
      </Button>
    </Card>
  )
}