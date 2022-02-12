import React from 'react'

//Material UI
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';

const SelectInput = ({ data, label, handleChange, values, name }) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    value={data}
                    label={label}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        values.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput