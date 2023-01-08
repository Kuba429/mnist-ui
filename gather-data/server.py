from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def hello_world():
    data = request.get_json()
    if (not data):
        return "err"  # TODO make returns do stuff
    print(data["array"])
    return "asd"
