import csv

def checkAgree(desc, playtype, x):
	parsed = []
	numbers = []
	parsed = desc[x].split( )
	for data in parsed:
		if data.find("-") != -1:
			numbers.append(data[0:data.find("-")])

	for num in numbers:
		num = num.replace("(", "")
		num = num.replace("[", "")

	if playtype == "PASS":
		if len(numbers) != 3:
			f2.write("PASS: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "RUSH":
		if len(numbers) != 2:
			f2.write("RUSH: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "SACK":
		if len(numbers) != 2:
			f2.write("SACK: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "EXTRA POINT":
		if len(numbers) != 3:
			f2.write("EXTRA POINT: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "KICK OFF":
		if len(numbers) != 1 or len(numbers) != 3:
			f2.write("KICK OFF: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "PUNT":
		if len(numbers) != 4 or len(numbers) != 2:
			f2.write("PUNT: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "SCRAMBLE":
		if len(numbers) != 2:
			f2.write("SCRAMBLE: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "CLOCK STOP":
		if len(numbers) != 1:
			f2.write("CLOCK STOP: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "FIELD GOAL":
		if len(numbers) != 3:
			f2.write("FIELD GOAL: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "QB KNEEL":
		if len(numbers) != 1:
			f2.write("QB KNEEL: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "FUMBLE":
		if len(numbers) != 4 or len(numbers) != 2:
			f2.write("FUMBLE: " + desc[x])
		else:
			print(str(numbers))
	elif playtype == "2POINT CONVERSION":
		if len(numbers) != 2:
			f2.write("2POINT CONVERSION: " + desc[x])
		else:
			print(str(numbers))
	else:
		f2.write("CASE NOT FOUND - " + playtype + ": " + desc[x])

def checkInt(string):
	try:
		string = int(string)
	except ValueError:
		pass
	return string

f = open('data/pbp-2016.csv')
f2 = open('baddesc.txt', 'w')
# f3 = open('pdesc.txt', 'w')
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
	checkAgree(desc, pType[x], x)

# (4:58) (SHOTGUN) 13-T.SIEMIAN PASS SHORT RIGHT TO 22-C.ANDERSON TO CAR 30 FOR 21 YARDS (58-T.DAVIS).