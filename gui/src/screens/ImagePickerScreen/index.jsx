import React, {useEffect, useState} from "react"
import {Button, Collapse, Stack, Typography} from "@mui/material"
import {Close, FileDownload, NavigateNext} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"
import ReactCrop from "react-image-crop"

import Code from "../../components/Code"
import Logo from "../../assets/tecknee-logo.png"

import "./index.css"
import "react-image-crop/dist/ReactCrop.css"
import ImagePickOption from "../../components/ImagePickOption/index.jsx";

function ImagePickerScreen() {
    const navigate = useNavigate()

    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState(null)
    const [cropSelected, setCropSelected] = useState(false)
    const [croppedImage, setCroppedImage] = useState(null)

    useEffect(() => {
        document.addEventListener("keydown", e => {
            if (e.ctrlKey) {
                if (e.key === "v") pasteImage()
                if (e.key === "z") {
                    setImage(null)
                    setCroppedImage(null)
                }
            }
            if (e.key === "Escape") {
                setCrop(null)
                setCroppedImage(null)
            }
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

    async function openImage(file) {
        const blob = new Blob([file], {type: file.type})
        setImage(URL.createObjectURL(blob))
    }

    async function openCrop(file) {
        const blob = new Blob([file], {type: file.type})
        navigate("/recognition", {state: URL.createObjectURL(blob)})
    }

    const makeClientCrop = async (crop) => {
        if ((image && crop.width && crop.height)) {
            const croppedImg = await getCroppedImage(image, crop)
            setCroppedImage(croppedImg)
        }
    }

    const getCroppedImage = (sourceImage, crop) => {
        const img = document.createElement("img")
        img.src = sourceImage

        const canvas = document.createElement("canvas")
        const scaleX = img.naturalWidth / img.width
        const scaleY = img.naturalHeight / img.height
        console.log(crop)
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext("2d")
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

        try {
            return new Promise((resolve) => {
                canvas.toBlob((file) => {
                    resolve(URL.createObjectURL(file))
                }, "image/jpeg")
            })
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // noinspection JSValidateTypes
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
                            setCroppedImage(null)
                        }}
                >
                    Discard image
                </Button>

                <Typography textAlign="body1" component="span">
                    You can also discard the image by pressing <Code>Ctrl</Code> + <Code>Z</Code>
                </Typography>
            </Stack>
        </Collapse>

        {
            image
                ? <>
                    <ReactCrop crop={crop}
                               onDragStart={() => setCropSelected(false)}
                               onDragEnd={() => setCropSelected(true)}
                               onChange={async c => {
                                   setCrop(c)
                               }}
                               onComplete={c => makeClientCrop(c)}
                    >
                        <img className="user-image" src={image}/>
                    </ReactCrop>
                    <Collapse in={cropSelected && crop !== null}
                              className="choose-crop-btn"
                              orientation="vertical"
                              mountOnEnter unmountOnExit>
                        <Stack direction="row" justifyContent="center" alignItems="center" gap="1em">
                            <Button variant="contained"
                                    color="secondary"
                                    disabled={croppedImage === null}
                                    startIcon={<FileDownload/>}
                                    href={croppedImage}
                                    download
                            >
                                Download
                            </Button>

                            <Button variant="contained"
                                    color="success"
                                    disabled={croppedImage === null}
                                    endIcon={<NavigateNext/>}
                                    onClick={async () => navigate("/recognition", {state: croppedImage})}
                            >
                                Use this crop
                            </Button>
                        </Stack>
                    </Collapse>
                </>
                : <Stack className="column">
                    <img src={Logo} className="logo"/>

                    <Stack direction="row" gap="1em">
                        <ImagePickOption label="Select a picture from your device"
                                         onUpload={file => openImage(file)}
                                         hint={
                                             <Typography variant="body1" component="span">
                                                 You can also paste a image from your clipboard
                                                 with <Code>Ctrl</Code> + <Code>V</Code>
                                             </Typography>
                                         }
                        />

                        <ImagePickOption label="Select a cropped pattern"
                                         onUpload={file => openCrop(file)}
                                         color="secondary"
                        />
                    </Stack>
                </Stack>
        }
    </Stack>
}

export default ImagePickerScreen