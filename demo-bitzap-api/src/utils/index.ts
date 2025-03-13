export const scanDomain = 'https://testnet-scan.bitlayer.org'

export const openTx = (hash: string) => {
  window.open(`${scanDomain}/tx/${hash}`)
}

export const getTokenIcon = (address: string) => {
  return `https://cdn.jsdelivr.net/gh/bitlayer-org/curve-assets/images/assets-bitlayer-testnet/${address}.png`
}
