import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import TodoLists from './Components/TodoLists';
import SnackBar from './Components/SnackBar';
import { SnackBarContext, ToastProvider } from './todosContext/SnackBarContext';

const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: '#b1d895f5',
    },
  },
  typography: {
    fontFamily: 'Handmade',
  },

});

function App() {





  return (

    <ThemeProvider theme={theme}>

      <ToastProvider >

        <div className="App"
          style={{
            display: "flex",
            // flexDirection:'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            background: '#141614',
            //overflowY: 'auto',
            height: '100vh', // أضف دي 👇
            width: '100%',
            direction: 'ltr'
          }} >

          <TodoLists />
        </div>

      </ToastProvider>

    </ThemeProvider>
  );
}

export default App;
