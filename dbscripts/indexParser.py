# indexParser.py
# cwilliamson226
# Simple Python script that uses pymongo and nflgame to create indexes in a database for all of the possible stats except for defense
import nflgame
from pymongo import MongoClient

# Uses nflgame API to grab stats from the 2016 season
games = nflgame.games(2016)
plays = nflgame.combine_plays(games)

# Creates a connection through pyMongo to the specified MongoDB, in this case mLab
connection = MongoClient("mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb")
db = connection.nfldb
db.authenticate('pledgemaster', 'skilodge')

# Goes through each player and creates a list of indexes for non-defensive players
indexes = []
for p in plays.players():
	for index in p.stats:
		i = str(index)
		if indexes.count(i) == 0:
			if 'defense' not in i and 'kicking' not in i and 'punting' not in i:
				print(i)
				indexes.append(i)

# Temporary code used to generate a list of all indexes in the DB
# f = open('indexes.txt', 'w')
# f.write("[")
# for i in indexes:
# 	f.write("'"+str(i)+"'" + ', ')
# f.write(']')

# Drops the current indexes to start fresh, then goes throught the list adding all of the unique indexes to the DB
db.nflgame_players.drop_indexes()
for i in indexes:
	print("2" + i)
	db.nflgame_players.create_index(i)