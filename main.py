import webview

window = webview.create_window("Image Pattern Recognizer", "./gui/dist/index.html")
webview.start(http_server=True)
