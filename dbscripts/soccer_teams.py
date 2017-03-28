from pymongo import MongoClient
import requests

import pprint


client = MongoClient('mongodb://socceradmin:skilodge@ds123050.mlab.com:23050/soccer')
db = client.soccer
collection = db.Teams


test_team = {
    "_id":0,
    "name": "Team",
    "code": "Code",
    "shortName": "shortName",
    "squadMarketValue": "444,444,444"
} 
teams = []

url = 'http://api.football-data.org/v1/teams/'
headers = {'X-Auth-Token' :'cca045f6339142bd9b04ed961c08bd51'}

x=890
while x < 2000:
    r = requests.get(url+str(x), headers=headers).json()
    
    try: 
        name = r['name']
    except:
        x+=1
        continue
    try: 
        code = r['code']
    except:
        code = null
    try: 
        shortName = r['shortName']
    except:
        shortName = null
    try:
        squadMarketValue = r['squadMarketValue']
    except: 
        squadMarketValue = null
    
    team = {
        "_id": x,
        "name": name,
        "code": code,
        "shortName": shortName,
        "squadMarketValue": squadMarketValue    
    }
    print team
    try:
        collection.insert_one(team).inserted_id
    except: 
        pass
    x+=1
