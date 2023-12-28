from flask import Flask,render_template,request,jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
#import pymongo
uri = "mongodb+srv://magenga187532:magenga21airr@votecluster.iocntxo.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'), tls=True, tlsAllowInvalidCertificates=True)
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db=client.main#選擇操作test資料庫
collection=db.政見題目#選擇操作users集合
ansCollection=db.結果數據
main= Flask(
    __name__,
    static_folder="static", #靜態檔案資料夾的名稱
    static_url_path="/static", #靜態檔案對應的網址路徑
    template_folder="html"
    )
main.secret_key = 'some_secret_key'

@main.route("/")
def mainrun():
    # frontNum=str(request.args.get("num"))
    # question=collection.find_one({"num":frontNum})
    # if question is not None:
    #     print(question)
    # else:
    #     print("not found")
    return render_template("main.html")

@main.route("/json")
def returnJsonData():
    num=request.args.get('num')
    jsonData=collection.find_one({'num':num},{"_id":0})
    Jdata=json.dumps(jsonData,ensure_ascii=False)
    return Jdata
    
@main.route("/saveData",methods=["POST"])
def saveData():
    data=request.json
    result = ansCollection.insert_one(data)
    return jsonify({'message': '數據已保存', 'id': str(result.inserted_id)})

if __name__=="__main__":
    main.run(debug=True)
