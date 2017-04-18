import csv

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
		players.append(numbers)

# for x in range(0, count):
# 	print str(oTeam[x]) + "-" + str(tYards[x]) + "-" + str(players[x])	
	


# For use later for file writing
# f = open('myfile', 'w')
# f.write('hi there\n')  # python will convert \n to os.linesep
# f.close()