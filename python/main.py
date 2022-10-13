from flask import Flask, request
from flask_cors import CORS

from image_processing import process_image
from util import image_from_base64

server = Flask(__name__)
CORS(server)


@server.route("/process")
def process_received_image():
    try:
        pattern = image_from_base64(request.json["pattern"])
        image = image_from_base64(request.json["image"])
        return process_image(pattern, image)
    except:
        return None


if __name__ == "__main__":
    server.run(port=8082)
