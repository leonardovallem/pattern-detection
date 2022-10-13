from cv2 import TM_CCOEFF_NORMED, COLOR_BGR2GRAY, matchTemplate, minMaxLoc, cvtColor
from numpy import array


def process_image(pattern, image) -> dict:
    try:
        pattern = cvtColor(array(pattern), COLOR_BGR2GRAY)
        image = cvtColor(array(image), COLOR_BGR2GRAY)

        result = matchTemplate(pattern, image, TM_CCOEFF_NORMED)
        mn, _, minLoc, maxLoc = minMaxLoc(result)
        startX, startY = minLoc

        endX = startX + pattern.shape[1]
        endY = startY + pattern.shape[0]

        return {
            "start": [startX, startY],
            "end": [endX, endY]
        }
    except Exception as e:
        return e
