import React from "react"
import {Button, Stack} from "@mui/material"
import {useLocation, useNavigate} from "react-router-dom"
import {Close} from "@mui/icons-material"

import "./index.css"

function ImageRecognitionScreen() {
    const navigate = useNavigate()
    const {state: image} = useLocation()

    React.useEffect(() => {
        if (!image) navigate("/")
    }, [image])

    return <Stack className="recognition-wrapper">
        <Button variant="outlined"
                color="error"
                endIcon={<Close/>}
                onClick={() => navigate("/")}
        >
            Discard image
        </Button>
        <img className="sample-image" src={image} onError={() => navigate("/")}/>
    </Stack>
}

export default ImageRecognitionScreen