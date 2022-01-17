import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './redux/Users';

const store = configureStore({
  reducer: {
    users: userReducer
  }
})



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
