import webview

window = webview.create_window("Image Pattern Recognizer", "./gui/dist/")
webview.start(http_server=True, debug=True)
