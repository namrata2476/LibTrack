import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(0)
  const nav = useNavigate()

  async function requestOtp(e){
    e.preventDefault()
    if (!email.endsWith('@kiit.ac.in')) return alert('Only @kiit.ac.in emails allowed')
    await axios.post('/api/auth/request-otp', { email })
    setStep(1)
  }

  async function verify(e){
    e.preventDefault()
    const res = await axios.post('/api/auth/verify-otp', { email, code })
    localStorage.setItem('token', res.data.token)
    nav('/')
  }

  return (
    <div>
      <h2>Student Login (KIIT)</h2>
      {step===0 ? (
        <form onSubmit={requestOtp}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@kiit.ac.in"/>
          <button>Request OTP</button>
        </form>
      ) : (
        <form onSubmit={verify}>
          <div>OTP sent to {email}</div>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter OTP"/>
          <button>Verify & Login</button>
        </form>
      )}
    </div>
  )
}
