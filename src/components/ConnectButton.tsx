'use client'

import { ConnectButton as DefaultConnectButton } from '@rainbow-me/rainbowkit';
import './connectButton.css';
import { ConnectIcon } from './ConnectIcon';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const styles = {
  ConnectorRow: {
    position: 'absolute',
    display: 'flex',
    gap: 12
  },
  ConnectorBox: {
    background: 'white',
    'border-radius': '7px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center' 
  },
  AccountBalance: {
    'font-weight': 'bold'
  }
}

export const ConnectButton = () => {
  return (
    <DefaultConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <section>
                    <div className="grid h-screen grid-rows-1">

                      <button onClick={openConnectModal} className="connectButton" type="button">
                        <span>Connect Wallet</span>
                        <ConnectIcon />
                      </button>
                    </div>
                  </section>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={styles.ConnectorRow}>
                  <button
                    onClick={openChainModal}
                    style={styles.ConnectorBox}
                    type="button"
                    className="flex flex-row gap-x-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 22,
                          height: 22,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 22, height: 22 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <KeyboardArrowDownOutlinedIcon />
                  </button>
                  <button onClick={openAccountModal} type="button" className="flex flex-row gap-x-2" style={styles.ConnectorBox}>
                    <AccountBalanceWalletOutlinedIcon />
                    <div style={styles.AccountBalance}>
                      {account.displayBalance
                      ? ` ${account.displayBalance}`
                      : ''}
                    </div>
                    {account.displayName}
                    <KeyboardArrowDownOutlinedIcon />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </DefaultConnectButton.Custom>
  );
};
