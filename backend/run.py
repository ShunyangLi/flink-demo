import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# f = open('./subgraphs/p1.json', 'r')
# p1 = json.load(f)
# f.close()

# f = open('./subgraphs/p2.json', 'r')
# p2 = json.load(f)
# f.close()

# f = open('./subgraphs/p3.json', 'r')
# p3 = json.load(f)
# f.close()



@app.route("/query", methods=["POST", "GET"])
@app.route("/", methods=["POST", "GET"])
def index():
    return jsonify({"query":{"edges":[{"dest":1,"label":"汇款","src":0},{"dest":2,"label":"汇款","src":1},{"dest":3,"label":"汇款","src":2},{"dest":4,"label":"汇款","src":3},{"dest":0,"label":"汇款","src":4}],"labels":["用户","商铺", "用户", "用户", "用户"]},"results":[['C3156307206', 'M0953332041', 'C2251403439', 'C6199774840', 'C5296316207'],['C3156307206', 'M0953332041', 'C2251403439', 'C6199774840', 'C3616991141'],['C2399396022', 'M0953332041', 'C4712130154', 'C1390809964', 'C0799661124'],['C8959575744', 'M0953332041', 'C2251403439', 'C6199774840', 'C6429496802'],['C0251119755', 'M8024019486', 'C5279709863', 'C9660880457', 'C9379131468'],['C0251119755', 'M8024019486', 'C6320308802', 'C6485425684', 'C5590610842'],['C0251119755', 'M8024019486', 'C4357891086', 'C3336820397', 'C7649266691']],"type":"pattern"})


app.run(debug=True)
