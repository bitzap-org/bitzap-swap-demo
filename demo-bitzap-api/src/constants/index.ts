export const USDT_ADDRESS = '0x67d4b8c97cf54539c1e80767201b5571e831342a'
export const USDC_ADDRESS = '0x40b45d6d774a0cc6eec380ed55528f3c9edb1e2c'

export function shortenAddress(address: string, chars = 4) {
  if (!address) {
      return '';
  }
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
