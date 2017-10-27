# dbpop2.py
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

# Creates a list of all indexes gathered from indexParser.py
allInds = ['passing_att', 'passing_yds', 'passing_cmp', 'passing_cmp_air_yds', 'passing_incmp', 'passing_incmp_air_yds', 'passing_sk', 'passing_sk_yds', 'passing_int', 'rushing_att', 'rushing_yds', 'passing_tds', 'rushing_twopta', 'rushing_twoptmissed', 'fumbles_rec_yds', 'fumbles_tot', 'fumbles_notforced', 'fumbles_forced', 'fumbles_lost', 'penalty', 'penalty_yds', 'receiving_yds', 'receiving_rec', 'receiving_tar', 'receiving_yac_yds', 'receiving_tds', 'rushing_tds', 'fumbles_rec', 'rushing_twoptm', 'passing_twopta', 'passing_twoptm', 'passing_twoptmissed', 'receiving_twoptm', 'receiving_twopta', 'receiving_twoptmissed', 'kickret_yds', 'kickret_ret', 'puntret_yds', 'puntret_tot', 'puntret_fair', 'fumbles_oob', 'puntret_tds', 'kickret_tds', 'kickret_fair', 'fumbles_rec_tds']

# Goes through all players in the DB
number = 0
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

	# Goes through all indexes in the DB for each player and sets their stats to what they should be, or sets it to 0 if they don't have those stats
	# This was added after the original script as we were having errors of grabbing undefined data for different players
	for x in range(0, len(allInds)):
		if allInds[x] in stats1:
			tempPlayer[allInds[x]] = stats2[stats1.index(allInds[x])]
		else:
			tempPlayer[allInds[x]] = 0

	# Inserts the temp player to the DB
	db.nflgame_players.insert_one(tempPlayer)