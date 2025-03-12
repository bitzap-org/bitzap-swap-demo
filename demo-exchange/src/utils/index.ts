export const scanDomain = 'https://testnet-scan.bitlayer.org'

export const openTx = (hash: string) => {
  window.open(`${scanDomain}/tx/${hash}`)
}
