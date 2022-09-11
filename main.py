import webview

from gui_interface import GuiInterface

if __name__ == "__main__":
    gui_interface = GuiInterface()

    window = webview.create_window("Image Pattern Recognizer", "./gui/dist/", js_api=gui_interface)
    webview.start(http_server=True, debug=True, gui="qt")
