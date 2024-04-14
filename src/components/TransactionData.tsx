// @ts-nocheck

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import useConfig from '../hooks/useConfig'

const styles = {
  Container: {
    background: '#dedede',
    padding: '10px',
    'text-align': 'center',
    'border-radius': '10px'
  },
  Hash: {
    'margin-left': '5px',
    color: '#326DC8',
    cursor: 'pointer',
    'text-decoration': 'underline'
  },
  Icon: {
    'margin-left': '5px',
    'cursor': 'pointer'
  }
}

export function TransactionData({ hash }) {

  const { EXPLORER_URL } = useConfig()

  const trimHash = hash => {
    const rawHash = hash.split('x')[1]
    return [
      '0x',
      rawHash.slice(0,5),
      '...',
      rawHash.slice(-7)
    ].join('')
  }

  const copyIconClick = () => {
    navigator.clipboard.writeText(hash);
  }

  return (
    <div style={styles.Container}>
      Transaction hash 
      <a href={EXPLORER_URL + `tx/${hash}`} style={styles.Hash} target="_blank" rel="noreferrer">
        {trimHash(hash)}
      </a>
      <ContentCopyOutlinedIcon style={styles.Icon} onClick={copyIconClick}/>
    </div>
  )
}
