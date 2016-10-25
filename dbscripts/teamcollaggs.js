//get divisions


db.getCollection('Teams').aggregate([{
    $match:{div:'AFC East'}
    
}])

//get conference
db.getCollection('Teams').createIndex({div:'text'})

db.getCollection('Teams').aggregate([{
    $match:{$text:{$search:'AFC'}}
    
}])


