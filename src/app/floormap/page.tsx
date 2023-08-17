'use client';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../context/store';
import axios from 'axios';
import { redirect } from 'next/navigation';

type Table = {
  id: number;
  available: boolean;
};

function FloorMap() {
  const user = useAppSelector(state => state.authReducer.user);
  const [tables, setTables] = useState([]);

  if (!user.isAuth) {
    redirect('/');
  }

  // console.log(user);

 

  useEffect(() => {
    const getTables = async () => {
      const response = await axios.get('http://localhost:5005/api/tables');
      const data = response.data;
      console.log(data);
      setTables(data);
    };
    getTables();
  }, []);

  console.log(tables);

  return (
    <div>
      <nav>Welcome {user?.firstName}</nav>
      <div className='flex'>
        {tables &&
          tables.map((table: Table, index) => (
            <div
              className=' bg-white border border-black text-black w-[5rem] flex justify-center content-center hover:cursor-pointer'
              key={index}
            >
              {table.id}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FloorMap;
