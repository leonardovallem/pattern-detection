import React from "react"
import "./index.css"

function Code({children}) {
    return <pre className="code-block">
        <code children={children} />
    </pre>
}

export default Code