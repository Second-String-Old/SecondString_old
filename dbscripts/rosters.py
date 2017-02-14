import urllib2
from bs4 import BeautifulSoup
import re

soup = BeautifulSoup(open("NE.html"), 'html.parser')
url = 'http://www.nfl.com/teams/roster?team='

pos = 0
player = ""
count = 0
roster = "{\n"

teams = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'OAK', 'PHI', 'PIT', 'SD', 'SEA', 'SF', 'STL', 'TB', 'TEN', 'WAS']
for x in teams:
	roster = "{\n"
	tempurl = url + x
	response = urllib2.urlopen(tempurl)
	page_source = response.read()
	soup = BeautifulSoup(page_source, 'html.parser')
	gotFirst = 0
	for tag in soup.find_all("td"):
		if gotFirst==0:
			gotFirst=1
		else:
			if pos==0:
				if tag.string:
					player = '	{\n 		' + tag.string + ',\n'
					pos+=1
				else:
					continue
			elif pos==1:
				if tag.a:
					player += '		' + tag.a.string + ',\n'
					pos+=1
				else:
					continue
			elif pos==2:
				if tag.string:
					player += '		' + tag.string + '\n 	}'
					roster += player + ',\n'
					player = ""
					pos+=1
				else:
					continue
			else:
				pos+=1
			if pos==9:
				pos=0
	roster += '}'
	f = open(x+'.txt', 'w');
	f.write(roster)
	f.close()
	gotFirst=0