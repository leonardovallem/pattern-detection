import React from 'react'
import Typography from '@mui/material/Typography'
import {Stack} from "@mui/material"

import "./index.css"

const TopAppBar = () => {
    return <Stack direction="row" className="topappbar">
        <Typography variant="h4">IPR</Typography>
    </Stack>
}

export default TopAppBar
