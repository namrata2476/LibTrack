import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Student(){
  const [reason, setReason] = useState('');
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  async function fetchRequests(){
    const res = await axios.get('/api/requests', { headers: { Authorization: `Bearer ${token}` } });
    setRequests(res.data);
  }

  useEffect(()=>{ fetchRequests() },[])

  async function submit(e){
    e.preventDefault();
    // In real app, studentId would be from auth; here we use 1
    await axios.post('/api/requests', { studentId: 1, reason }, { headers: { Authorization: `Bearer ${token}` } });
    setReason('');
    fetchRequests();
  }

  return (
    <div>
      <h2>Student Dashboard</h2>
      <form onSubmit={submit}>
        <div>
          <label>Reason</label>
          <input value={reason} onChange={e=>setReason(e.target.value)} />
        </div>
        <button type="submit">Request Library</button>
      </form>

      <h3>Your Requests</h3>
      <ul>
        {requests.map(r=> (
          <li key={r.id}>{r.id} - {r.status} - {r.reason || 'no reason'}</li>
        ))}
      </ul>
    </div>
  )
}
