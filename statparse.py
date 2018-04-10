import csv
from pymongo import MongoClient

class Player(object):

    def __init__ (self, T, N):

        #start with zero

        self.team = T
        self.number = N
        self.yards = 0

    def addYards(self, y):

        self.yards += int(y)

    def getTeam(self):
    	return self.team

    def getNumber(self):
    	return self.number

    def getYards(self):
    	return self.yards

f = open('data/pbp-2016.csv')
csv_f = csv.reader(f)

# Creates empty lists for each variable and a size counter
offTeam = []
defTeam = []
desc = []
yards = []
pType = []
size = 0;

# Increases size, appends variables in from specific columns of the input csv
for row in csv_f:
	size += 1
	offTeam.append(row[5])
	defTeam.append(row[6])
	desc.append(row[14])
	yards.append(row[19])
	pType.append(row[21])

# Creates empty list for players involved (stored as QB, Receiver), Offensive team, and yards for the play
players = []
oTeam = []
tYards = []
count = 0

# Goes through each play from the original lists
for x in range(0, size):
	parsed = []
	numbers = []
	# Find PASS plays and parse the description for the plays by whitespaces
	if pType[x] == "PASS":
		count += 1
		parsed = desc[x].split( )
		# print parsed
		# Go through parsed, find the - character to find their numbers, and append the player numbers to the list
		for i in range(0, len(parsed)):
			if parsed[i].find("-") != -1:
				numbers.append(parsed[i][0:parsed[i].find("-")])
			if len(numbers) == 2:
				break
		# print numbers
		# Append the parsed data to final lists
		oTeam.append(offTeam[x])
		tYards.append(yards[x])
		# print(offTeam[x] + " " + str(numbers) + " " + yards[x])
		players.append(numbers)

PlayYards = []
# Creates a list of Player classes
for x in range(0, count):
	# If list is empty, create temp Players with team & number, then increment their yards and append to PlayYards
	if len(PlayYards) == 0:
		p = Player(oTeam[x],players[x][0])
		p.addYards(int(tYards[x]))
		p2 = Player(oTeam[x], players[x][1])
		p2.addYards(tYards[x])
		PlayYards.append(p)
		PlayYards.append(p2)
	# If list has Players in it already
	else:
		# Booleans to track if P1 or P2 are in the list
		found1 = 0
		found2 = 0
		for y in PlayYards:
			# print y.getTeam()
			# If either player is found, add to it's yards and mark found
			if found1 == 0 and len(players[x]) == 2 and y.getNumber() == players[x][0] and y.getTeam() == oTeam[x]:
				y.addYards(tYards[x])
				# print("found")
				found1 = 1
			if found2 == 0 and len(players[x]) == 2 and y.getNumber() == players[x][1] and y.getTeam() == oTeam[x]:
				y.addYards(tYards[x])
				found2 = 1
				# print("found2")
			if found1 == 1 and found2 == 1:
				break;
		# If P1 or P2 isn't found, create new Player and add it to list
		if len(players[x]) == 2 and found1 == 0:
			p = Player(oTeam[x],players[x][0])
			p.addYards(tYards[x])
			PlayYards.append(p)
		if len(players[x]) == 2 and found2 == 0:
			p2 = Player(oTeam[x], players[x][1])
			p2.addYards(tYards[x])
			PlayYards.append(p2)
	# print str(oTeam[x]) + "-" + str(tYards[x]) + "-" + str(players[x])

connection = MongoClient("mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb")
# db = client.nfldb
# connection = MongoClient("ds021356.mlab.com", 21356)
db = connection.nfldb
db.authenticate('pledgemaster', 'skilodge')

for x in PlayYards:
	print(x.getTeam() + " " + str(x.getNumber()) + " " + str(x.getYards()))
	# print(find({'team': x.getTeam(), 'number': x.getNumber()}))
	# print(db.Players_copy.index_information())
	print(db.Players_copy.find_one_and_update({'team': x.getTeam(), 'number': x.getNumber() }, { "$inc": { 'pyards': x.getYards() } }, upsert=False))
	# print(result)
# for x in PlayYards:
# 	print getTeam(x) + " - " + getNumber(x) + " - " + str(getYards(x))

# For use later for file writing
# f = open('myfile', 'w')
# f.write('hi there\n')  # python will convert \n to os.linesep
# f.close()