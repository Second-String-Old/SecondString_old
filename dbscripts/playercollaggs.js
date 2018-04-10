//filter by position

db.getCollection('Players').aggregate([{
    $match:{POS: 'WR'}  
}]);

//filter by team

db.getCollection('Players').aggregate([{
    $match:{team: 'Seahawks'}  
}]);

//sort by variable ascending
//docs w/o variable are returned first 

db.getCollection('Players').aggregate([{
    $sort:{rushyards: 1}  
}]);

