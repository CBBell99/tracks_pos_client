'use client';

import { useState } from 'react';
import axios from 'axios';
import PinPadButton from './PinPadButton';

function Login() {
  const [enteredPin, setEnteredPin] = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);

  type Employee = {
    firstName: string;
  };

  const handlePinChange = (digit: string) => {
    setEnteredPin(prevPin => prevPin + digit);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5005/api/employees/login',
        { pin: enteredPin },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      setEmployee(data.employee);
      setEnteredPin('');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setEmployee(null);
  };

  return (
    <div>
      <input
        className='text-black'
        type='password'
        onChange={e => setEnteredPin(e.target.value)}
        value={enteredPin}
      />
      <div className='mt-5 grid grid-cols-3'>
        <PinPadButton onClick={() => handlePinChange('1')}>1</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('2')}>2</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('3')}>3</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('4')}>4</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('5')}>5</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('6')}>6</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('7')}>7</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('8')}>8</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('9')}>9</PinPadButton>
        <PinPadButton onClick={handleLogin}>Login</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('9')}>0</PinPadButton>
        <PinPadButton onClick={handleLogout}>Logout</PinPadButton>
      </div>
      {employee && `Welcome ${employee.firstName}`}
    </div>
  );
}

export default Login;
