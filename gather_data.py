import httplib, urllib, base64, errno

headers = {
    #request headers
     'Ocp-Apim-Subscription-Key': "1b56b2ff60794b8fb2168cd46c9f63fb",
}

params = urllib.urlencode({
  #none  
})

#getting team names
try: 
    conn = httplib.HTTPSConnection('api.fantasydata.net')
    conn.request("GET", "/nfl/v2/JSON/Teams?%s" % params, "{body}", headers)
    response = conn.getresponse()
    team_data = response.read()
    print(team_data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

#getting player data
try: 
    conn = httplib.HTTPSConnection('api.fantasydata.net')
    conn.request("GET", "/nfl/v2/JSON/Players?%s" % params, "{body}", headers)
    response = conn.getresponse()
    player_data = response.read()
    print(player_data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

#cross referencing team and player data to make team rosters