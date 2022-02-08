import React from 'react';
import Job from './pages/index';

import { Container } from '@mui/material';

import "./style/style.css"

const App = () => {
  return (
    <Container fixed>
      <Job />
    </Container>
  );
};

export default App;
