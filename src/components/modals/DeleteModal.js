import React from 'react'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

//Store
import { useJobStore } from "../../context/JobContext";
import ButtonGroup from '../../common/ButtonGroup';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DeleteModal = ({ openDeleteModal, handleDeleteClose, deleteItemId }) => {
    const { removeJob } = useJobStore();
    const yesDeleteItem = () => {
        removeJob(deleteItemId);
        handleDeleteClose();
    }
    return (
        <Dialog
            open={openDeleteModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDeleteClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you ure you want to delete it?"}</DialogTitle>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                <ButtonGroup
                    onClick={handleDeleteClose}
                    variant="contained"
                    label="Cancel"
                    color="secondary"
                />
                <ButtonGroup
                    onClick={yesDeleteItem}
                    variant="contained"
                    label="Approve"
                    color="error"
                />
            </DialogActions>
        </Dialog>
    )
}

export default DeleteModal