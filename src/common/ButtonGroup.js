import React from 'react'
// Material UI
import { Button } from '@mui/material';

const ButtonGroup = ({ type, startIcon, sx, size, variant, label, style, color, onClick }) => {
    return (
        <Button
            color={color}
            style={style}
            type={type}
            onClick={onClick}
            startIcon={startIcon}
            sx={sx}
            size={size}
            variant={variant}
        >
            {label}
        </Button>
    )
}

export default ButtonGroup;