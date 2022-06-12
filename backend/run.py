import json
import copy
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

f = open('./subgraphs/p1.json', 'r')
p1 = json.load(f)
f.close()

f = open('./subgraphs/p2.json', 'r')
p2 = json.load(f)
f.close()

f = open('./subgraphs/p3.json', 'r')
p3 = json.load(f)
f.close()


def fetch_subpattern(pattern, id):
    p = copy.deepcopy(p1)

    if pattern == 1:
        p = p1
    elif pattern == 2:
        p = p2
    elif pattern == 3:
        p = p3
    else:
        return None

    eids = p["nodes"][id]
    edges = []

    for eid in eids:
        edges.append(p["results"][eid])
        
    result = copy.deepcopy(p)
    result["results"] = edges[:1]

    return result


def fetch_pattern(pattern):
    p = copy.deepcopy(p1)

    if pattern == 1:
        p = p1
    elif pattern == 2:
        p = p2
    elif pattern == 3:
        p = p3
    else:
        return None

    result = copy.deepcopy(p)
    edges = p["results"][:100]
    result["results"] = edges

    return result


def fetch_table(pattern):
    p = copy.deepcopy(p1)

    if pattern == 1:
        p = p1
    elif pattern == 2:
        p = p2
    elif pattern == 3:
        p = p3
    else:
        return None
    
    nodes = []

    tns = p["nodes"].keys()

    for index, node in enumerate(tns):
        nodes.append({
            "rank": index + 1,
            "account": node,
            "percent": len(p["nodes"][node])
        })

    return nodes[:200]


@app.route("/table/<p>", methods=["POST", "GET"])
def table(p):
    result = fetch_table(int(p))
    return jsonify(result)


@app.route("/patter/<p>", methods=["POST", "GET"])
def index(p):
    result = fetch_pattern(int(p))
    return jsonify(result)


@app.route("/query/<p>/<id>", methods=["POST", "GET"])
def query(p, id):
    result = fetch_subpattern(int(p), id)

    return jsonify(result)

app.run(debug=True)
