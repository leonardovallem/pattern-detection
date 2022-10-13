import React, {useEffect, useRef, useState} from "react"
import {Alert, Button, Fab, Fade, LinearProgress, Snackbar, Stack} from "@mui/material"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {ArrowBack, Close} from "@mui/icons-material"
import ImagePickOption from "../../components/ImagePickOption/index.jsx"
import {processImage} from "../../Api.js"
import "./index.css"
import {blobToImage, RuleOfThirds} from "../../util/Util.js";

function ImageRecognitionScreen() {
    const navigate = useNavigate()
    const {state: pattern} = useLocation()
    const canvas = useRef()
    const detectionImage = useRef()

    const [image, setImage] = useState(null)
    const [detection, setDetection] = useState(null)

    const [python, setPython] = useState(null)
    const [running, setRunning] = useState(false)
    const [snackBarContent, setSnackBarContent] = useState(null)

    useEffect(() => {
        if (window.pywebview?.api) setPython(new Api(window.pywebview.api))
    }, [window.pywebview])

    React.useEffect(() => {
        if (!pattern) navigate("/")
    }, [pattern])

    useEffect(() => {
        if (!detection) return

        /** @type {HTMLCanvasElement} */
        const canv = canvas.current
        if (!canv) return

        const [startX, startY] = detection.start
        const [endX, endY] = detection.end

        blobToImage(image, (img) => {
            const {width: realWidth, height: realHeight} = img
            const {width: viewWidth, height: viewHeight} = detectionImage?.current

            const rotX = RuleOfThirds.fromLeftToRight(viewWidth, realWidth)
            const _startX = rotX.getLeftWithRight(startX)
            const _endX = Math.abs(rotX.getLeftWithRight(endX) - _startX)

            const rotY = RuleOfThirds.fromLeftToRight(viewHeight, realHeight)
            const _startY = rotY.getLeftWithRight(startY)
            const _endY = Math.abs(rotY.getLeftWithRight(endY) - _startY)

            canv.width = viewWidth
            canv.height = viewHeight

            canv.drawRectangle(_startX, _startY, _endX, _endY)
        })
    }, [detection, canvas])

    async function openImage(file) {
        setRunning(true)
        const blob = new Blob([file], {type: file.type})
        const imageBlob = URL.createObjectURL(blob)
        setImage(imageBlob)

        const patternBase64 = await fetch(pattern)
            .then(img => img.blob())
            .then(blob => blob.toBase64())

        const imageBase64 = await fetch(imageBlob)
            .then(img => img.blob())
            .then(blob => blob.toBase64())

        processImage(patternBase64, imageBase64)
            .then(res => setDetection(res))
            .catch(err => {
                console.log(err)
                setSnackBarContent(new SnackbarContent(err, "error"))
            })
            .finally(() => setRunning(false))
    }

    return <div className="recognition-wrapper">
        <Fade in={running} className="detection-progress-indicator">
            <LinearProgress />
        </Fade>
        <Fab className="fab-go-back">
            <Link to="/">
                <ArrowBack />
            </Link>
        </Fab>

        <div className="pattern-grid-item">
            <Stack gap="1em">
                <img className="sample-image" src={pattern} onError={() => navigate("/")} />
                <Button variant="outlined"
                        color="error"
                        style={{alignSelf: "center"}}
                        endIcon={<Close />}
                        onClick={() => navigate("/")}
                >
                    Discard pattern
                </Button>
            </Stack>
        </div>
        <div className="detection-content">
            {
                image
                    ? <Stack gap="1em" className="image-picker-grid-item">
                        <div className="detection-image-overlay">
                            <img src={image} ref={detectionImage} className="detection-image" />
                            <canvas ref={canvas} />
                        </div>
                        <Button variant="outlined"
                                color="error"
                                style={{alignSelf: "center"}}
                                endIcon={<Close />}
                                onClick={() => setImage(null)}
                        >
                            Discard image
                        </Button>
                    </Stack>
                    : <ImagePickOption label="Pick an image to detect the pattern"
                                       color="success"
                                       className="image-picker-component"
                                       onUpload={file => openImage(file)}
                    />
            }
        </div>

        <Snackbar open={snackBarContent !== null}
                  onClose={() => setSnackBarContent(null)}
                  autoHideDuration={5000}
                  key={snackBarContent}
        >
            <Alert severity={snackBarContent?.level}>{snackBarContent?.message}</Alert>
        </Snackbar>
    </div>
}

export default ImageRecognitionScreen