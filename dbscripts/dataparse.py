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

for i in range(0, size):
	print offTeam[i] + "-" + defTeam[i] +"-"+yards[i]+"-"+pType[i]