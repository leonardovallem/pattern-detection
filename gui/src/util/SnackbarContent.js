export default class SnackbarContent {
    constructor(message, level) {
        this.message = message
        this.level = ["success", "info", "warning", "error"].includes(level) ? level : "info"
    }
}