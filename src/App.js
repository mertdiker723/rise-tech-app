import React from 'react';
import Job from './pages/index';

import { Container } from '@mui/material';

import JobContextProvider from "./context/JobContext";

import "./style/style.css"

const App = () => {
  return (
    <JobContextProvider>
      <Container fixed>
        <Job />
      </Container>
    </JobContextProvider>

  );
};

export default App;
