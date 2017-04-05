
"""
Parses multiple files containing baseball information and creates
a baseball player class
"""

from pymongo import MongoClient
import Player as pl
import csv
import requests

client = MongoClient('mongodb://baseballadmin:skilodge4@ds011331.mlab.com:11331/mlbdb')
db = client.mlbdb   # connect to the MLB database 
p_col = db.Players  # connect to Players collection

def makePlayer(filename):
    f = open('core/' + filename)
    csv_f = csv.reader(f)

    players = []
    
    count = 0
    for row in csv_f:
        player = pl.Player(row[13], row[14], row[0])
        players.append(player)
        if count == 10:
            break
        count += 1

    return players[1:]


def getTeams(filename):
    f = open('core/' + filename)
    csv_f = csv.reader(f)

    teams = []

    for team in csv_f:
        if team[0] == "2015":
            #teams.append(team[40])  # team name
            teams.append(team[2])   # team id

    return teams[1:]

if __name__ == "__main__":

    master = input("name of master file: ")
    teams  = input("name of teams file: ")

    players = makePlayer(master)   # list of player objects
    teams   = getTeams(teams)

    for i in teams:
        print(i)

    print()

    for i in players:
        print(i.fullname() + " -- " + i.id)


