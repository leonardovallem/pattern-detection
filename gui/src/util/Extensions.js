export default function extensions() {
    Blob.prototype.toBase64 = function () {
        return new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsDataURL(this)
            reader.onload = () => res(reader.result)
            reader.onerror = err => rej(err)
        })
    }
}
