from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://magenga187532:magenga21airr@votecluster.iocntxo.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db=client.main#選擇操作test資料庫
politicsCollection=db.政見題目#選擇操作users集合
def insertData():#新增資料
    data=[
        {"num":"1","Q":"經濟發展","description":"經濟...","option1":"11","option2":"12","option3":"13"},
        {"num":"2","Q":"勞動政策","description":"勞動...","option1":"21","option2":"22","option3":"23"},
        {"num":"3","Q":"兩岸局勢","description":"兩岸...","option1":"31","option2":"32","option3":"33"},
        {"num":"4","Q":"生育政策","description":"生育...","option1":"41","option2":"42","option3":"43"},
        {"num":"5","Q":"教育趨勢","description":"教育...","option1":"51","option2":"52","option3":"53"},
        {"num":"6","Q":"能源政策","description":"能源...","option1":"61","option2":"62","option3":"63"},
        {"num":"7","Q":"住宅方針","description":"住宅...","option1":"71","option2":"72","option3":"73"},
        {"num":"8","Q":"長照醫療","description":"長照...","option1":"81","option2":"82","option3":"83"}]
    politicsCollection.insert_many(data)

def drop():#刪除集合
    politicsCollection.drop()
    if "政見題目" in db.list_collection_names():
        print("farl")
    else:
        print("ok")
def updateData():#修改資料第一個{條件}第二個{修改內容}
    politicsCollection.update_one()

insertData()
# drop()