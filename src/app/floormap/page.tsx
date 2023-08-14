"use client";
import { useAppSelector } from '../context/store';
import { RootState } from '../context/store';
import { log } from 'console';
function FloorMap() {
  const user = useAppSelector((state) => state.authReducer.value);
  console.log(user);

  return <div>floor</div>;
}

export default FloorMap;
