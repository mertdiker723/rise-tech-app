import React from 'react';
//Material UI
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
// Store
import JobContextProvider from "./context/JobContext";
//Css
import "./style/style.css"
//Folders
import Job from './pages/index';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <JobContextProvider>
      <Container fixed>
        <Job />
      </Container>
      <ToastContainer />
    </JobContextProvider>
  );
};

export default App;
