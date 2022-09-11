from cv2 import TM_SQDIFF_NORMED, matchTemplate, minMaxLoc


def process_image(pattern, image) -> dict:
    result = matchTemplate(pattern, image, TM_SQDIFF_NORMED)
    mn, _, mnLoc, _ = minMaxLoc(result)
    MPx, MPy = mnLoc
    trows, tcols = pattern.shape[:2]

    return {
        "start": [MPx, MPy],
        "end": [MPx + tcols, MPy + trows]
    }
