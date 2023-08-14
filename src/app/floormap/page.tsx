"use client";
import { useAppSelector } from '../context/store';

function FloorMap() {
  const user = useAppSelector((state) => state.authReducer.value);
  console.log(user);

  return <div>Welcome {user.firstName}</div>;
}

export default FloorMap;
