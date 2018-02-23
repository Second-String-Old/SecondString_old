
"""
Parses multiple files containing baseball information and creates
a baseball player class
"""

from pymongo import MongoClient
import requests
import csv
import sys

client = MongoClient('mongodb://baseballadmin:skilodge4@ds011331.mlab.com:11331/mlbdb')
db = client.mlbdb   # connect to the MLB database 
p_col = db.Players  # connect to Players collection

if __name__ == "__main__":
    infile = sys.argv[1]
    f = open('core/' + infile, 'r')
    csv_f = csv.reader(f)
    for row in csv_f:
        player = {
            "_id": row[0],
            "name": row[13] + ' ' + row[14],
            "weight": row[16],
            "height": row[17],
            "bats": row[18],
            "throws": row[19]
        }
        try:
            p_col.updateOne(
                { "_id": row[0] },
                { set: { "name": row[13] + ' ' + row[14], "weight": row[16], "height": row[17], "bats": row[18], "throws": row[19] } },
                { upsert: True }
            )
        except:
            pass
    print('finished')