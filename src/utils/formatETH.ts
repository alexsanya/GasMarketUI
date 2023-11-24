function formatETH(amountWei) {
  if (amountWei < BigInt(10**6)) {
    return `${amountWei} WEI`
  }
  if ((amountWei >= BigInt(10**6)) && (amountWei < BigInt(10**15))) {
    return `${Number(amountWei / BigInt(10**6)) / 1000} GWEI`
  }

  return `${Number(amountWei / BigInt(10**15)) / 1000} ETH`
}

export default formatETH
