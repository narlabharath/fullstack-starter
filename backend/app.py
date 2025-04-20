from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/hello", methods=["POST"])
def hello():
    data = request.get_json()
    name = data.get("name", "friend")
    return jsonify({"message": f"Hello, {name}!"})

@app.route("/api/repeat", methods=["POST"])
def repeat():
    data = request.get_json()
    word = data.get("word", "")
    return jsonify({"result": word * 2})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
