import httplib, urllib, base64, errno, json

headers = {
    #request headers
     'Ocp-Apim-Subscription-Key': "1b56b2ff60794b8fb2168cd46c9f63fb",
}

params = urllib.urlencode({
  #none  
})

#team_data = []
#getting team names
try: 
    conn = httplib.HTTPSConnection('api.fantasydata.net')
    conn.request("GET", "/nfl/v2/JSON/Teams?%s" % params, "{body}", headers)
    response = conn.getresponse()
    team_data = response.read()#json.loads(response)
    parsed_team = json.loads(team_data)  
    conn.close()
except Exception as e:
   print("[Errno {0}] {1}".format(e.errno, e.strerror))

#getting player data
try: 
    conn = httplib.HTTPSConnection('api.fantasydata.net')
    conn.request("GET", "/nfl/v2/JSON/Players?%s" % params, "{body}", headers)
    response = conn.getresponse()
    player_data = response.read()
    parsed_player = json.loads(player_data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))
    
try:
    conn = httplib.HTTPSConnection('api.fantasydata.net')
    conn.request("GET", "/nfl/v2/JSON/PlayerSeasonStats/2015REG?%s" % params, "{body}", headers)
    response = conn.getresponse()
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

#print parsed_player[0]
#cross referencing team and player data to make team rosters
class Team:
    def __init__(self, name, key):
        self.roster = []
        self.name = name
        self.key = key
        
    def add_to_roster(self, player):
        self.roster.append(player)

class Player:
    def __init__(self, name, team, pos, num, age):
        self.name = name
        self.team = team
        self.pos = pos
        self.num = num
        self.age = age

teams = list()
for team in parsed_team:
    teams.append(Team(team['FullName'],team['Key']))

no_team = []
players = list()
for player in parsed_player:
    players.append(Player(player['Name'], player['Team'], player['Position'], player['Number'], player['Age']))
    
for player in players:    
    if player.team is None:
        no_team.append(player.name)
    for team in teams:
        if player.team == team.key:
            team.add_to_roster(player)
            
for team in teams:
    #print team.name
    for p in team.roster:
        pass
        #print p.name


print len(no_team)