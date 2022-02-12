import React, { useState } from 'react';

// Material UI
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
//Icons
import AddIcon from '@mui/icons-material/Add';

import ButtonGroup from "../common/ButtonGroup";
import SelectInput from '../common/SelectInput';
import { toastyWarn } from "../common/ToastyInformation";

// Store
import { useJobStore } from "../context/JobContext";

const initialState = {
    jobName: '',
    priority: ''
}

const totalPriority = [
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
]
const CreateJob = () => {
    const { addJob } = useJobStore();
    const [jobInfo, setJobInfo] = useState(initialState);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setJobInfo({
            ...jobInfo,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { jobName, priority } = jobInfo;
        if (jobName === '' || priority === '') {
            toastyWarn('Job Name and Job Priority must be entered!');
        }
        else {
            addJob({
                jobName,
                priority
            })
            setJobInfo(initialState);
        }

    }
    const { jobName, priority } = jobInfo;
    return (
        <div className='header__container'>
            <div className='header__create-new-job'>Create New Job</div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing="20" style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={12} md={8}>
                        <TextField
                            id="outlined-basic"
                            label="Job Name"
                            name="jobName"
                            value={jobName}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 255,
                            }}
                            variant="outlined"
                            style={{
                                width: "100%"
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={2}>
                        <SelectInput
                            data={priority}
                            name='priority'
                            label={"Job Priority"}
                            handleChange={handleChange}
                            values={totalPriority}
                        />
                    </Grid>
                    <Grid xs={6} sm={6} item md={2}>
                        <ButtonGroup
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
                            label={"Create"}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};


export default CreateJob;
