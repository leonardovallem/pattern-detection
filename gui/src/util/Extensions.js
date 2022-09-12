export default function extensions() {
    Blob.prototype.toBase64 = function () {
        return new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsDataURL(this)
            reader.onload = () => res(reader.result)
            reader.onerror = err => rej(err)
        })
    }

    HTMLCanvasElement.prototype.drawRectangle = function (startX, startY, endX, endY) {
        const ctx = this.getContext("2d")

        const gradient = ctx.createLinearGradient(0, 25, 170, 390)
        gradient.addColorStop(0, "blue")
        gradient.addColorStop(0.5, "green")
        gradient.addColorStop(1.0, "red")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.strokeRect(startX, startY, endX, endY)
        ctx.stroke()
    }
}
