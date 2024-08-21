import pandas as pd
import os
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient


data = pd.read_csv('core_member_test.csv')

json_data = data.to_dict(orient='records')
db_uri = os.getenv('MONGO_URI')
print("Connecting to Database...")
client = MongoClient(db_uri)
db = client['test']
collection = db['certificates']
print("Database connected successfully!")

print("Modifying Database...")
for row in json_data:
    collection.update_one({'_id': row.get('_id')}, {'$set': row}, upsert=True)
print("Database modified successfully!")