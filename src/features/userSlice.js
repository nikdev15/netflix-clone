import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  name: 'subscription',
  initialState: {
    user: null,
    subscription: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    subscribed: (state, action) => {
      state.subscription = action.payload;
    }
  }
});

export const { login, logout, subscribed } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectSubscription =(state) => state.subscription.subscription;

export default userSlice.reducer;
