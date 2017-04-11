import csv

f = open('data/pbp-2016.csv')
csv_f = csv.reader(f)

offTeam = []
defTeam = []
desc = []
yards = []
pType = []
size = 0;

for row in csv_f:
	size += 1
	offTeam.append(row[5])
	defTeam.append(row[6])
	desc.append(row[14])
	yards.append(row[19])
	pType.append(row[21])

players = []
oTeam = []
tYards = []
count = 0
for x in range(0, size):
	parsed = []
	numbers = []
	if pType[x] == "PASS":
		count += 1
		parsed = desc[x].split( )
		# print parsed
		for i in range(0, len(parsed)):
			if parsed[i].find("-") != -1:
				numbers.append(parsed[i][0:parsed[i].find("-")])
			if len(numbers) == 2:
				break
		# print numbers
		oTeam.append(offTeam[x])
		tYards.append(yards[x])
		players.append(numbers)

for x in range(0, count):
	

# f = open('myfile', 'w')
# f.write('hi there\n')  # python will convert \n to os.linesep
# f.close()
