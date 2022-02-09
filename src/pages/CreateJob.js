import React, { useState } from 'react';

// Material UI
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

//Icons
import AddIcon from '@mui/icons-material/Add';

// Store
import { useJobStore } from "../context/JobContext";


const CreateJob = () => {
    const { addJob } = useJobStore();
    const [jobName, setJobName] = useState('');
    const [priority, setPriority] = useState('');
    const [totalPriority, setTotalPriority] = useState([
        {
            id: 1,
            name: "Urgent"
        },
        {
            id: 2,
            name: "Regular"
        },
        {
            id: 3,
            name: "Trivial"
        }
    ])
    const handleChangeSelect = (event) => {
        setPriority(event.target.value);
    };

    const handleChangeInput = e => {
        setJobName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        addJob({
            jobName,
            priority
        })
    }
    return (
        <div className='header__container'>
            <div className='header__create-new-job'>Create New Job</div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing="20" style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={12} md={8}>
                        <TextField
                            id="outlined-basic"
                            label="Job Name"
                            value={jobName}
                            onChange={handleChangeInput}
                            variant="outlined"
                            style={{
                                width: "100%"
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Job Priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={priority}
                                    label="Job Priority"
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        totalPriority.map((pri, index) => {
                                            return (
                                                <MenuItem key={index} value={pri.id}>{pri.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid xs={6} sm={6} item md={2}>
                        <Button
                            type="submit"
                            startIcon={<AddIcon />}
                            sx={{
                                "&.MuiButton-root": {
                                    height: 54.5,
                                    width: "100%"
                                },
                                textTransform: "none"
                            }}
                            size="large"
                            variant="contained"
                        >Create</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};


export default CreateJob;
