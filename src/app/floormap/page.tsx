"use client";
import { useState, useEffect } from 'react';
import { useAppSelector } from '../context/store';
import axios from 'axios';
import { type } from 'os';

type Table = {
  id: number;
  available: boolean;
}

function FloorMap() {
  const [tables, setTables] = useState([]);

  const user = useAppSelector((state) => state.authReducer.user);
  
  useEffect(() => {
    const getTables = async () => {
      const response = await axios.get('http://localhost:5005/api/tables')
      const data = response.data
      console.log(data);
      setTables(data)
    }
    getTables()
}, []);

  console.log(tables);
  
  
  return (
    <div>
      <nav>Welcome {user?.firstName}</nav>
      <div>
        {tables.map((table: Table, index) => (
          <div className='bg-white border border-black text-black w-15 h-15 flex justify-center content-center hover:cursor-pointer' key={index}>{table.id}</div>
        ))}
      </div>

    </div>
  );
}

export default FloorMap;
