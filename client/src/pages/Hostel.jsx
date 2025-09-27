import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Hostel(){
  const [requests, setRequests] = useState([]);

  async function fetch(){
    const res = await axios.get('/api/requests?status=pending');
    setRequests(res.data);
  }

  useEffect(()=>{ fetch() },[])

  async function decide(id, decision){
    await axios.post(`/api/hostel/${id}/decision`, { decision });
    fetch();
  }

  return (
    <div>
      <h2>Hostel Dashboard</h2>
      <h3>Pending Requests</h3>
      <ul>
        {requests.map(r=> (
          <li key={r.id}>{r.id} - Student {r.studentId} - {r.reason}
            <button onClick={()=>decide(r.id,'approved')}>Approve</button>
            <button onClick={()=>decide(r.id,'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
