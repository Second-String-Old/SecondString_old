# dbpop.py
# cwilliamson226
# Python script that uses nflgame to pull stats of all players then pushes them to the MongoDB

import nflgame
import json
from pymongo import MongoClient

# Imports the stats from the 2016 season
games = nflgame.games(2016)
plays = nflgame.combine_plays(games)

# Creates a connection through pyMongo to the specified MongoDB, in this case mLab
connection = MongoClient("mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb")
db = connection.nfldb
db.authenticate('pledgemaster', 'skilodge')

# Goes through all players in the DB
for p in plays.players():
	# Checks to make sure that the player exists before accessing it's variables
	if not p or not p.player or not p.player.first_name or not p.player.last_name or not p.player.position or not p.team:
		continue

	# Creates empty stats list to read in the dict
	stats1 = []
	stats2 = []

	# Goes through stats dictionary for each player, adding them to their respective lists
	for x in p.stats:
		# We don't want defense, kicking, and punting stats for now due to indexing limitations in Mongo
		if 'defense' not in x and 'kicking' not in x and 'punting' not in x:
			stats1.append(x)
			stats2.append(p.stats[x])

	# Creates a temp player dictionary using the attributes of the player we're on
	tempPlayer =  { 'firstname': str(p.player.first_name), 'lastname': str(p.player.last_name), 'pos': str(p.player.position), 'team': str(p.team), 'tds': str(p.tds) }

	# Goes through the stats lists and appends them to the dictionary for the temp player
	for x in range(0, len(stats1)):
		tempPlayer[stats1[x]] = stats2[x]

	# Inserts the temp player to the DB
	db.nflgame_players.insert_one(tempPlayer)