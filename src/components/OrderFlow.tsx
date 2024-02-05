import { BackButton } from '../components/BackButton'
import { StagesFlow } from '../components/StagesFlow'

const styles = {
  Box: {
    margin: 'auto',
    top: '145px',
    left: '841px',
    width: '472px',
    height: '707px',
    borderRadius: '4px',
    border: '1px solid #e1e1e1',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 10px rgba(3,3,3,0.08)',
  },
  CloseIcon: {
    color: '#eeeeee',
    fill: '#eeeeee',
    fontSize: '16px',
    width: '16px',
    height: '16px',
    margin: '5px'
  },
  Header: {
    color: '#ffffff',
    margin: 'auto',
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: '38px',
  },
};

const CloseIcon = () => (
  <svg style={styles.CloseIcon}  viewBox="0 0 352 512">
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
    </path>
  </svg>
);

export function OrderFlow() {
  return (
    <div class="flex flex-col justify-between">
      <div style={styles.Box} className="flex flex-col">
        <div className="flex flex-row justify-end w-full">
          <CloseIcon />
        </div>
        <div style={styles.Header}>Processing your request</div>
        <StagesFlow />
        <BackButton />
      </div>
    </div>
  )
}
