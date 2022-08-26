import './App.css'
import {Button, Stack} from "@mui/material"
import {FileUpload} from "@mui/icons-material"

function App() {
    return (
        <Stack>
            <Button variant="contained" component="label" endIcon={<FileUpload/>}>
                Upload
                <input hidden accept="image/*" multiple type="file"/>
            </Button>
        </Stack>
    )
}

export default App
