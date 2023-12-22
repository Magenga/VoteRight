from flask import Flask,render_template,render_template_string,flash,request,redirect,session
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
#import pymongo
uri = "mongodb+srv://magenga187532:magenga21airr@votecluster.iocntxo.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db=client.main#選擇操作test資料庫
collection=db.政見題目#選擇操作users集合
main= Flask(
    __name__,
    static_folder="static", #靜態檔案資料夾的名稱
    static_url_path="/static", #靜態檔案對應的網址路徑
    template_folder="html"
    )
main.secret_key = 'some_secret_key'

@main.route("/")
def mainrun():
    frontNum=str(request.args.get("num"))
    num=collection.find_one({},{"題號":frontNum})
    data=[num['題號']]
    print(data)
    return render_template("main.html",data=data)

if __name__=="__main__":
    main.run(debug=True)
