'use client'

import { useState } from 'react'
import PermitMessageSigner from '../components/PermitMessageSigner'
import RewardMessageSigner from '../components/RewardMessageSigner'

export function OrderForm() {
  const [token, setToken] = useState('')
  const [reward, setReward] = useState('')
  const [value, setValue] = useState('')
  const [lifetime, setLifetime] = useState('')
  const [permitSignature, setPermitSignature] = useState('')
  const [permitMessage, setPermitMessage] = useState({})

  const onPermitSigned = (message, signature) => {
    setPermitMessage(message)
    setPermitSignature(signature)
  }

  const onRewardSigned = async (message, rewardSignature) => {
    const order = {
      signer: permitMessage.owner,
      token,
      value,
      deadline: permitMessage.deadline.toString(),
      reward,
      permitSignature,
      rewardSignature
    }
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    console.log(order)
    console.log(response)
  }

  return (
    <>
      <div>
        Token address:{' '}
        <input
          onChange={(e) => setToken(e.target.value)}
          placeholder="token address"
          value={token}
        />
      </div>
      <div>
        Value:{' '}
        <input
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
          value={value}
        />
      </div>
      <div>
        Reward:{' '}
        <input
          onChange={(e) => setReward(e.target.value)}
          placeholder="reward"
          value={reward}
        />
      </div>
      <div>
        Lifetime in seconds:{' '}
        <input
          onChange={(e) => setLifetime(e.target.value)}
          placeholder="lifetime"
          value={lifetime}
        />
      </div>
      <PermitMessageSigner token={token} value={value} lifetime={lifetime} onSuccess={onPermitSigned} />
      <RewardMessageSigner permitSignature={permitSignature} value={reward} onSuccess={onRewardSigned}/>
    </>
  )
}
