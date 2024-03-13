// @ts-nocheck

import React, { useEffect } from 'react';
import { useAccount, useSignTypedData, useNetwork } from 'wagmi'
import useDomain from '../hooks/useDomain'
import usePermitMessage from '../hooks/usePermitMessage'
import RewardMessageSigner from './RewardMessageSigner'
import permitTypes from '../resources/permitTypes.json' assert { type: 'json' }

const styles = {
  Button: {
    cursor: 'pointer',
    margin: 'auto',
    height: '48px',
    width: '100%',
    padding: '0px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: '9px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '7px',
    backgroundColor: '#2A64C5',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
    outline: 'none',
  }
};

export const SwapButton = ({ token, value, reward, lifetime, onOrderSigned }) => {
  const domain = useDomain(token)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const message = usePermitMessage(address, token, value, lifetime)

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      primaryType: 'Permit',
      types: permitTypes,
      message
    })

  const onRewardSigned = (rewardMessage, rewardSignature) => {
    console.log('Order is signed')
    console.log({message})
    const order = {
      signer: message.owner,
      networkId: chain.id,
      token,
      value,
      deadline: parseInt(message.deadline),
      reward,
      permitSignature: data,
      rewardSignature
    }
    onOrderSigned(order)
  }


  const signOrder = async () => {
    console.log({token, value, lifetime, domain, address, message})
    signTypedData()
  }

  return (
    <>
      <button style={styles.Button} onClick={signOrder}>
        <span>Swap</span>
      </button>
      { data &&  <RewardMessageSigner permitSignature={data} value={reward} onSuccess={onRewardSigned}/>}
    </>
  );
};

