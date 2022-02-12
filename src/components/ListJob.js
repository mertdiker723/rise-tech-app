import React, { useState } from 'react'

//Matarial UI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, InputAdornment, TextField, Grid } from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import ButtonGroup from "../common/ButtonGroup";

//Store
import { useJobStore } from "../context/JobContext";
import SelectInput from '../common/SelectInput';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';

const initialState = {
    jobName: '',
    priority: ''
}

const ListJob = () => {
    const { jobs, findItem, setEditItem } = useJobStore();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [jobInfo, setJobInfo] = useState(initialState);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setJobInfo({
            ...jobInfo,
            [name]: value
        })
    };

    const handleDeleteOpen = (id) => {
        setSelectedItem(id)
        setOpenDeleteModal(true)
    }

    const handleDeleteClose = () => {
        setOpenDeleteModal(false)
    }
    const handleEditOpen = (id) => {
        setSelectedItem(id);
        findItem(id);
        setOpenEditModal(true);
    }
    const handleEditClose = () => {
        setOpenEditModal(false);
        setEditItem(null)
    }

    const filtedData = () => {
        let filtered = jobs;
        const { jobName, priority } = jobInfo
        if (priority !== '') {
            filtered = jobs.filter((m) =>
                m.priority === priority
            );
        }
        return filtered.filter(x => x.jobName.includes(jobName));
    }

    return (
        <>
            <div className='header__list-all-jobs'>Job List</div>
            <JobSearching
                priority={jobInfo.priority}
                jobName={jobInfo.jobName}
                handleChange={handleChange}
                totalPriority={totalPriority}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHeader />
                    <TableBodyInside
                        filtedData={filtedData}
                        handleEditOpen={handleEditOpen}
                        handleDeleteOpen={handleDeleteOpen}
                    />
                </Table>
            </TableContainer>
            <DeleteModal
                deleteItemId={selectedItem}
                openDeleteModal={openDeleteModal}
                handleDeleteClose={handleDeleteClose}
            />
            <EditModal
                editItemId={selectedItem}
                openEditModal={openEditModal}
                handleEditClose={handleEditClose}
            />
        </>
    )
}

const TableHeader = () => {
    return (
        <TableHead style={{ backgroundColor: "#E4F6F8" }}>
            <TableRow>
                <TableCell className='table-cell__header'>Name</TableCell>
                <TableCell className='table-cell__header' align="center">Priorty</TableCell>
                <TableCell className='table-cell__header' align="center">Action</TableCell>
            </TableRow>
        </TableHead>
    )
}

const TableBodyInside = ({ filtedData, handleEditOpen, handleDeleteOpen }) => {
    return (
        <TableBody>
            {filtedData().map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.jobName}
                    </TableCell>
                    <TableCell align="center">
                        <PriortyCheck pri={row} />
                    </TableCell>
                    <TableCell align="center">
                        <IconButton onClick={() => handleEditOpen(row.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteOpen(row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

const PriortyCheck = ({ pri }) => {
    return <>
        {pri.priority === 1 && <ButtonGroup label="Urgent" variant="contained" style={{ padding: "5px 20px", textTransform: "none", fontWeight: "600" }} color="error" />}
        {pri.priority === 2 && <ButtonGroup label="Regular" variant="contained" style={{ padding: "5px 16px", textTransform: "none", fontWeight: "600" }} color="warning" />}
        {pri.priority === 3 && <ButtonGroup label="Trival" variant="contained" style={{ padding: "5px 25px", textTransform: "none", fontWeight: "600" }} color="primary" />}
        {pri.priority === '' && <ButtonGroup label="Empty" variant="contained" style={{ padding: "5px 22px", textTransform: "none", fontWeight: "600" }} color="secondary" />}
    </>
}


const JobSearching = (props) => {
    return (
        <Grid container style={{ marginTop: "20px", marginBottom: "20px" }} spacing="20" >
            <Grid item xs={8}>
                <TextField
                    id="outlined-start-adornment"
                    sx={{ width: '100%' }}
                    placeholder="Job Name"
                    value={props.jobName}
                    name="jobName"
                    onChange={props.handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <SelectInput
                    data={props.priority}
                    label={"Priority (all)"}
                    name="priority"
                    handleChange={props.handleChange}
                    values={props.totalPriority}
                />
            </Grid>
        </Grid>
    )
}

export default ListJob