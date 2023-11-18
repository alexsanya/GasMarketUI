function formatETH(amountWei) {
  if (amountWei < 10n**6n) {
    return `${amountWei} WEI`
  }
  if ((amountWei >= 10n**6n) && (amountWei < 10n**15n)) {
    return `${Number(amountWei / 10n**6n) / 1000} GWEI`
  }

  return `${Number(amountWei / 10n**15n) / 1000} ETH`
}

export default formatETH
