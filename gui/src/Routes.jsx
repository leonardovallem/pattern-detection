import {Route, Routes} from "react-router-dom"
import ImagePickerScreen from "./screens/ImagePickerScreen"
import ImageRecognitionScreen from "./screens/ImageRecognitionScreen"

function AppRoutes() {
    return <Routes>
        <Route path="/" element={<ImagePickerScreen/>}/>
        <Route path="/recognition" element={<ImageRecognitionScreen/>}/>
    </Routes>
}

export default AppRoutes