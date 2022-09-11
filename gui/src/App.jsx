import {Stack} from "@mui/material"
import {BrowserRouter} from "react-router-dom"
import {useEffect} from "react"
import Routes from "./Routes"
import extensions from "./util/Extensions.js"
import "./App.css"

function App() {
    useEffect(() => {
        extensions()
    }, [])

    return (
        <Stack width="100vw" height="100vh">
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Stack>
    )
}

export default App
