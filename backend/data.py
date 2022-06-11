import json
# from textwrap import indent

filename = './data/2.txt'


data = []
with open(filename, 'r') as f:
    for line in f:
        line = line.strip()
        line = line.replace("'",'').replace(" ", '').replace('[','').replace(']','')
        data.append(line.split(','))
        # print(line.split(','))
        # break

edges = data[10000:]


f = open('./subgraphs/2.json', 'r')
jfile = json.load(f)

jfile["results"] = edges
f.close()

nodes = {}

for index,edge in enumerate(edges):
    for node in edge:
        if node[0] != 'C':
            continue
        if node not in nodes:
            nodes[node] = []
        
        nodes[node].append(index)


nodes = {k: v for k, v in sorted(nodes.items(), key=lambda item: len(item[1]), reverse=True)}

jfile["nodes"] = nodes

# print(jfile)

f = open('./subgraphs/p2.json', 'w')

f.write(json.dumps(jfile,indent=4))
f.close()