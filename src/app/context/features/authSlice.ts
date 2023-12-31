import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: Employee;
}

type Employee = {
  isAuth: boolean;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  id: string | null;
  pin: string | null;
  email: string | null;
  password: string | null;
};

const initialState = {
  user: {
    isAuth: false,
    firstName: null,
    lastName: null,
    role: null,
    id: null,
    pin: null ,
    email: null,
    password: null
  } as Employee
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
        user: {
          ...state.user,
          isAuth: true,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          role: action.payload.role,
          id: action.payload.id,
          pin: action.payload.pin,
          email: action.payload.email,
          password: action.payload.password

        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions
export default auth.reducer
