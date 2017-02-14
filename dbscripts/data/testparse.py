import csv

f = open('pbp-2016.csv')
csv_f = csv.reader(f)

for row in csv_f:
	desc = row[14]
	for x in desc:
		if row[23] == 1:
			if desc[x] == '-':
				print desc[x-2] + desc[x-1]