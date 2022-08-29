import {Stack} from "@mui/material"
import {BrowserRouter} from "react-router-dom"

import './App.css'
import Routes from "./Routes"

function App() {
    return (
        <Stack width="100vw" height="100vh">
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Stack>
    )
}

export default App
