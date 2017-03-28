from pymongo import MongoClient
import requests

import pprint


client = MongoClient('mongodb://socceradmin:skilodge@ds123050.mlab.com:23050/soccer')
db = client.soccer
p_coll = db.Players
t_coll = db.Teams

url = 'http://api.football-data.org/v1/teams/'
headers = {'X-Auth-Token' :'cca045f6339142bd9b04ed961c08bd51'}

x = 0
count = 0
team_id = []
for team in t_coll.find():
    team_id.append(team['_id'])

or _id in team_id:
    r = requests.get(url+str(_id)+'/players', headers=headers).json()
    try:
        for player in r['players']:
            try: 
                name = player['name'] 
            except:
                continue
            try: 
                marketValue = player['marketValue'] 
            except:
                marketValue = '0'
            try:
                jerseyNumber = player['jerseyNumber']
            except:
                jerseyNumber = "none"
            try:
                contractUntil = player['contractUntil']
            except:
                contractUntil = "none"
            try:
                nationality = player['nationality']
            except:
                nationality = "none"
            try:
                position = player['position']
            except:
                position = "none"
            try: 
                dateOfBirth = player['dateOfBirth']
            except:
                dateOfBirth = "none"
            #try: 
            #    _id = player['_id']
            #except:
            #    continue
            player1 = {
                "_id": count,
                "name": name,
                "marketValue": marketValue,
                "jerseyNumber": jerseyNumber,
                "dateOfBirth": dateOfBirth,
                "contractUntil": contractUntil,
                "nationality": nationality,
                "position": position
            }
            #print player1['name'] 
            count+=1
            #print count
            try:
                p_coll.insert_one(player1).inserted_id
            #    print player1
            except: 
                pass
    except:
        pass

print 'done'
    
    
   
    
    