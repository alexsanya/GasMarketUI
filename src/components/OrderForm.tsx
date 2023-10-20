'use client'

import { useState } from 'react'
import PermitMessageSigner from '../components/PermitMessageSigner'

export function OrderForm() {
  const [token, setToken] = useState('')
  const [reward, setReward] = useState('')
  const [value, setValue] = useState('')
  const [lifetime, setLifetime] = useState('')

  const onPermitSigned = (message, signature) => {
    console.log('Permit signature: ', signature)
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
      <PermitMessageSigner token={token} value={value} lifetime={lifetime} onSuccess={onPermitSigned}/>
    </>
  )
}
