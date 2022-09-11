export default class Python {
    constructor(api) {
        this.api = api
    }

    testPrint = async () => await this.api.testPrint()
    downloadImage = async base64 => await this.api.downloadImage(base64)
    processImage = async base64 => await this.api.processImage(base64)
}
