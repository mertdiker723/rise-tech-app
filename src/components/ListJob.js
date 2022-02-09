import React from 'react'

//Matarial UI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Store
import { useJobStore } from "../context/JobContext";


const ListJob = () => {
    const { jobs, removeJob } = useJobStore();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: "#E4F6F8" }}>
                    <TableRow>
                        <TableCell style={{ fontWeight: "600", color: "grey" }}>Name</TableCell>
                        <TableCell style={{ fontWeight: "600", color: "grey" }} align="center">Priorty</TableCell>
                        <TableCell style={{ fontWeight: "600", color: "grey" }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.jobName}
                            </TableCell>
                            <TableCell align="center">
                                <Button color="success"><PriortyCheck pri={row} /></Button>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => removeJob(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const PriortyCheck = ({ pri }) => {
    return <>
        {pri.priority === 1 && <Button variant="contained" style={{ padding: "5px 20px", textTransform: "none", fontWeight: "600" }} color="error">Urgent</Button>}
        {pri.priority === 2 && <Button variant="contained" style={{ padding: "5px 16px", textTransform: "none", fontWeight: "600" }} color="warning">Regular</Button>}
        {pri.priority === 3 && <Button variant="contained" style={{ padding: "5px 25px", textTransform: "none", fontWeight: "600" }} color="primary">Trival</Button>}
        {pri.priority === '' && <Button variant="contained" style={{ padding: "5px 22px", textTransform: "none", fontWeight: "600" }} color="secondary">Empty</Button>}
    </>
}

export default ListJob