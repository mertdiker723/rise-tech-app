import React, { useState, useEffect } from 'react'

// Material UI
import { Grid, TextField, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
//Store
import { useJobStore } from "../../context/JobContext";
import ButtonGroup from '../../common/ButtonGroup';
import SelectInput from './../../common/SelectInput';
import { toastyWarn } from "../../common/ToastyInformation";

const initialState = {
    jobName: '',
    priority: ''
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditModal = ({ openEditModal, handleEditClose, editItemId }) => {
    const { editJob, editItem } = useJobStore();
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
    const [jobInfo, setJobInfo] = useState(initialState);

    useEffect(() => {
        if (editItem) {
            setJobInfo({
                jobName: editItem.jobName,
                priority: editItem.priority
            })
        }
    }, [editItem])

    const onCloseModel = () => {
        handleEditClose();
        setJobInfo(initialState);
    }
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
            editJob({
                jobName,
                priority,
                id: editItemId
            })
            handleEditClose();
        }
    }

    const { jobName, priority } = jobInfo;
    return (
        <>
            <Dialog
                open={openEditModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={onCloseModel}
                aria-describedby="alert-dialog-slide-descriptionn"
            >

                <DialogTitle textAlign="center">{"Job Edit"}</DialogTitle>
                <DialogContent>
                    <EditForm
                        totalPriority={totalPriority}
                        handleChange={handleChange}
                        priority={priority}
                        jobName={jobName}
                        handleEditClose={onCloseModel}
                        handleSubmit={handleSubmit}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

const EditForm = ({ handleSubmit, handleEditClose, totalPriority, handleChange, priority, jobName }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Grid container style={{ marginTop: "20px", marginBottom: "20px" }} spacing="20" >
                <Grid item xs={12}>
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ width: '100%' }}
                        placeholder="Job Name"
                        label="Job Name"
                        name="jobName"
                        inputProps={{
                            maxLength: 255,
                        }}
                        variant="outlined"
                        value={jobName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SelectInput
                        data={priority}
                        label={"Priority (all)"}
                        name="priority"
                        handleChange={handleChange}
                        values={totalPriority}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent={"center"}>
                    <ButtonGroup
                        onClick={handleEditClose}
                        variant="contained"
                        label="Cancel"
                        color="secondary"
                        style={{ marginRight: "20px" }}
                    />
                    <ButtonGroup
                        type="submit"
                        variant="contained"
                        label="Save"
                        color="error"
                    />
                </Grid>
            </Grid>
        </form>
    )
}

export default EditModal