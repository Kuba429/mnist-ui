from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/submit", methods=["POST"])
def hello_world():
    req = request.get_json()
    if (not req):
        return "err"

    f = open("data.json")
    data = json.load(f)
    f.close()

    data.append({"digit": req["digit"], "array": req["array"]})
    json_data = json.dumps(data)
    with open("data.json", "w") as f:
        f.write(json_data)
    return "ok"
