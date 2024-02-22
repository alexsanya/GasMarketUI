import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const styles = {
  Container: {
    background: '#dedede',
    padding: '10px',
    'text-align': 'center',
    'border-radius': '10px'
  },
  Hash: {
    color: '#326DC8',
    cursor: 'pointer',
    'text-decoration': 'underline'
  },
  Icon: {
    'margin-left': '5px'
  }
}

export function TransactionData({ hash }) {
  return (
    <div style={styles.Container}>
      Transaction hash <span style={styles.Hash}>{hash}</span>
      <ContentCopyOutlinedIcon style={styles.Icon}/>
    </div>
  )
}
