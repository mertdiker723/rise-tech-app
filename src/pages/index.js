import React from 'react';

// Material UI
import { Divider } from '@mui/material';

// Folders
import Header from './Header';
import CreateJob from './CreateJob';
import ListJob from '../components/ListJob';

const Job = () => {
  return (
    <>
      <Header />
      <Divider sx={{
        padding: "10px 0px 10px 0px"
      }} />
      <CreateJob />
      <ListJob />
    </>
  );
};

export default Job;
