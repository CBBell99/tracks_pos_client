import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
}

type AuthState = {
  isAuth: boolean;
  firstName: string;
  lastName: string;
  role: string;
  id: string;
}

const initialState = {
  value: {
    isAuth: false,
    firstName: '',
    lastName: '',
    role: '',
    id:''
  } as AuthState
} as InitialState

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState
    },
    logIn:(_, action: PayloadAction<string>)=>{
      return {
        value: {
          isAuth: true,
          firstName: action.payload,
          lastName: action.payload,
          role: action.payload,
          id: action.payload
      }}
    }
  }
})

export const { logOut, logIn } = auth.actions
export default auth.reducer
