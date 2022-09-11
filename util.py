import base64
from io import BytesIO

from PIL import Image


def image_from_base64(base64_str: str) -> Image:
    trimmed = base64_str.split("base64,")[1]
    return Image.open(BytesIO(base64.decodebytes(bytes(trimmed, "ascii"))))
