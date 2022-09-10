import React from "react"
import {Button, Collapse, Stack, Typography} from "@mui/material"
import {Close, FileUpload} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"
import ReactCrop from "react-image-crop"

import Code from "../../components/Code"
import Logo from "../../assets/tecknee-logo.png"

import "./index.css"
import "react-image-crop/dist/ReactCrop.css"

function ImagePickerScreen() {
    const navigate = useNavigate()

    const [image, setImage] = React.useState(null)
    const [crop, setCrop] = React.useState(null)
    const [cropSelected, setCropSelected] = React.useState(false)

    React.useEffect(() => {
        document.addEventListener("keydown", e => {
            if (e.ctrlKey) {
                if (e.key === "v") pasteImage()
                if (e.key === "z") setImage(null)
            }
            if (e.key === "Escape") setCrop(null)
        })
    }, [])

    async function pasteImage() {
        const permission = await navigator.permissions.query({name: "clipboard-read"})
        if (permission.state === "denied") {
            console.error("Not allowed to read clipboard")
            return
        }

        const clipboardContents = await navigator.clipboard.read()
        for (const item of clipboardContents) {
            if (item.types.includes("image/png")) {
                const blob = await item.getType("image/png")
                setImage(URL.createObjectURL(blob))
                return
            }
        }
    }

    async function openFile(file) {
        const blob = new Blob([file], {type: file.type})
        setImage(URL.createObjectURL(blob))
    }

    function getCroppedImage() {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        const img = new Image()
        img.setAttribute("src", image)

        const scaleX = img.naturalWidth / img.width
        const scaleY = img.naturalHeight / img.height
        canvas.width = crop.width
        canvas.height = crop.height

        console.log(img, scaleX)

        ctx.drawImage(
            img,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"))
                    return
                }

                blob.name = "crop.png"

                const croppedImageUrl = window.URL.createObjectURL(blob)
                resolve(croppedImageUrl)
            }, "image/png")
        })
    }

    return <Stack className="image-picker column">
        <Collapse in={image !== null}
                  className="discard-image-btn"
                  orientation="vertical"
                  mountOnEnter unmountOnExit>
            <Stack direction="row" justifyContent="center" gap="1.4em">
                <Button variant="outlined"
                        color="error"
                        endIcon={<Close/>}
                        onClick={() => {
                            setImage(null)
                            setCrop(null)
                        }}
                >
                    Discard image
                </Button>

                <Typography textAlign="body1" component="span">
                    You can also discard the image by pressing <Code>Ctrl</Code> + <Code>Z</Code>
                </Typography>
            </Stack>
        </Collapse>

        {image
            ? <>
                <ReactCrop crop={crop}
                           onDragStart={() => setCropSelected(false)}
                           onDragEnd={() => setCropSelected(true)}
                           onChange={c => setCrop(c)}>
                    <img className="user-image" src={image}/>
                </ReactCrop>
                <Collapse in={cropSelected && crop !== null}
                          className="choose-crop-btn"
                          orientation="vertical"
                          mountOnEnter unmountOnExit>
                    <Button variant="contained"
                            color="success"
                            onClick={async () => navigate("/recognition", {state: await getCroppedImage()})}
                    >
                        Use this crop
                    </Button>
                </Collapse>
            </>
            : <Stack className="column">
                <img src={Logo} className="logo"/>
                <Typography textAlign="body1" marginY="1em">Start by selecting a picture from your device</Typography>

                <Button variant="contained"
                        component="label"
                        endIcon={<FileUpload/>}
                >
                    Upload
                    <input hidden accept=".jpg,.jpeg,.png" multiple type="file"
                           onChange={(e) => openFile(e.target.files[0])}/>
                </Button>

                <Typography variant="body1" component="span">
                    You can also paste a image from your clipboard with <Code>Ctrl</Code> + <Code>V</Code>
                </Typography>
            </Stack>}
    </Stack>
}

export default ImagePickerScreen