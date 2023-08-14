'use client';

import { useState } from 'react';
import axios from 'axios';
import PinPadButton from './PinPadButton';
import { logIn, logOut } from '../context/features/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../context/store';
import { useRouter } from 'next/navigation';

function Login() {
  const [enteredPin, setEnteredPin] = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  type Employee = {
    firstName: string;
  };

  const handlePinChange = (digit: string) => {
    setEnteredPin(prevPin => prevPin + digit);
  };

  const handleLogin = async () => {
    setEnteredPin('');
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
      const employee = data.employee;

      if (enteredPin !== employee.pin) {
        throw new Error('Invalid PIN entered');
      }
      setEmployee(employee);
      dispatch(logIn(employee));
      router.push('/floormap');
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Invalid PIN entered');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Employee not found');
      } else {
        setErrorMessage('Error logging in');
        console.error('Error logging in:', error);
      }
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
    }
  };

  const handleLogout = () => {
    setEmployee(null);
    dispatch(logOut());
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
        <PinPadButton onClick={handleLogout}>Logout</PinPadButton>
        <PinPadButton onClick={() => handlePinChange('9')}>0</PinPadButton>
        <PinPadButton onClick={handleLogin}>Login</PinPadButton>
      </div>
      {employee && <p>Welcome {employee.firstName}</p>}
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </div>
  );
}

export default Login;
