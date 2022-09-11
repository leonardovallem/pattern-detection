import React from "react"
import {Button, Stack, Typography} from "@mui/material"
import {FileUpload} from "@mui/icons-material"
import Code from "../Code/index.jsx";

const style = {
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "1em",
    border: "thin #a0a0a0 solid",
    padding: "1em",
    borderRadius: "1em"
}

function ImagePickOption({label, hint, onUpload, color}) {
    return <Stack style={style}>
        <Typography textAlign="body1" marginY="1em">{label}</Typography>

        <Button variant="contained"
                component="label"
                color={color ?? "primary"}
                endIcon={<FileUpload/>}
        >
            Upload
            <input hidden
                   accept=".jpg,.jpeg,.png"
                   multiple type="file"
                   onChange={e => onUpload(e.target.files[0])}/>
        </Button>

        <Typography variant="body1" component="span">{hint}</Typography>
    </Stack>
}

export default ImagePickOption
