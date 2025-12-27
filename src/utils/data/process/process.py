import json

file = open("D:\\Xia_Project\\VUEProject\\EndfieldSimulation\\EndfieldSimulation\\src\\utils\\data\\data.json","r",encoding="utf-8")
jsonobj = json.load(file)
file.close()

output = []
for item in jsonobj["items"]:
    if item["category"] == "material":
        output.append(item)


if 1:
    name = "material"
    outputFile = open("./{}.json".format(name),"w", encoding="utf-8")
    outputFile.write(json.dumps(output,ensure_ascii=False,indent=2))

