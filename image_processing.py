from cv2 import TM_SQDIFF_NORMED, COLOR_BGR2RGB, matchTemplate, minMaxLoc, cvtColor
from numpy import array


def process_image(pattern, image) -> dict:
    try:
        pattern = cvtColor(array(pattern), COLOR_BGR2RGB)
        image = cvtColor(array(image), COLOR_BGR2RGB)

        result = matchTemplate(pattern, image, TM_SQDIFF_NORMED)
        mn, _, mnLoc, _ = minMaxLoc(result)
        MPx, MPy = mnLoc
        trows, tcols = pattern.shape[:2]

        return {
            "start": [MPx, MPy],
            "end": [MPx + tcols, MPy + trows]
        }
    except Exception as e:
        return e
