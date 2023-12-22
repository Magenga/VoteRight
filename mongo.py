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
collection=db.政見題目#選擇操作users集合
def insertOne(num):
    data={
        "題號":num
    }
    collection.insert_one(data)

