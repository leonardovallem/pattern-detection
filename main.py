import webview

from gui_interface import GuiInterface

if __name__ == "__main__":
    gui_interface = GuiInterface()

    window = webview.create_window("Image Pattern Recognizer",
                                   url="http://127.0.0.1:5173",
                                   js_api=gui_interface,
                                   width=1280,
                                   height=720,
                                   background_color="#212121")
    webview.start(http_server=True, gui="qt", debug=True)
