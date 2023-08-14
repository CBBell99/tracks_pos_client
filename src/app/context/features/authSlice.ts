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
      return initialState;
    },
    logIn: (state, action: PayloadAction<Employee>) => {
      return {
        ...state,
        value: {
          ...state.value,
          isAuth: true,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          role: action.payload.role,
          id: action.payload.id,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions
export default auth.reducer
