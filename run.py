from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST", "GET"])
def index():
    return jsonify({"data": {
                           "type":"pattern",
                           "query":{
                               "labels":[
                                   "node label 1",
                                   "node label 2",
                                   "node label 3"
                               ],
                               "edges":[
                                   [
                                       0,
                                       1,
                                       "edge label 1"
                                   ],
                                   [
                                       1,
                                       2,
                                       "edge label 2"
                                   ],
                                       [
                                       2,
                                       0,
                                       "edge label 3"
                                   ]
                               ]
                           },
                           "results":[
                               [0, 1, 2],
                               [1, 2, 3]
                           ]
                       }})


app.run(debug=True)
