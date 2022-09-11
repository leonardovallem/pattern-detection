from pathlib import Path

from image_processing import process_image
from util import image_from_base64


class GuiInterface:
    def downloadImage(self, base64):
        try:
            image_from_base64(base64).save(str(Path.home() / "Downloads/image.png"))
            return True
        except:
            return False

    def processImage(self, pattern_base64, image_base64):
        try:
            pattern = image_from_base64(pattern_base64)
            image = image_from_base64(image_base64)
            return process_image(pattern, image)
        except:
            return None

    def testPrint(self):
        return "test here"
