import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Librarian(){
  const [approved, setApproved] = useState([]);

  async function fetch(){
    const res = await axios.get('/api/librarian/approved');
    setApproved(res.data);
  }

  useEffect(()=>{ fetch() },[])

  return (
    <div>
      <h2>Librarian Dashboard</h2>
      <h3>Approved Requests</h3>
      <ul>
        {approved.map(a => (
          <li key={a.id}>{a.id} - Student {a.studentId} - {a.reason}</li>
        ))}
      </ul>
    </div>
  )
}
