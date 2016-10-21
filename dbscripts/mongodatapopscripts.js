

//qb stats input



db.getCollection('Players').insert({
    name:'Tyrod Taylor',
    POS:'QB',
    team:'Bills',
    gp:6,
    comp:103,
    att:165,
    compper:62.4,
    pyards:1076,
    ptds:8,
    ints:2,
    fum:3,
    fumlost:1,
    carries:34,
    rushyards:236,
    rushtuddies:1
    
    })


//wr stats input
db.getCollection('Players').insert({
    name:'Kenny Brit',
    POS:'WR',
    team:'Rams',
    gp:6,
    recs:30,
    tars:40,
    recyards:492,
    rectuddies:2,
    fum:1,
    fumlost:1,
    atts:2,
    rushyards:14
    
    })


//rb stats input
db.getCollection('Players').insert({
    name:'Christine Michael',
    POS:'RB',
    team:'Seahawks',
    gp:5,
    atts:81,
    rushyards:354,
    rushtuddies:4,
    fum:2,
    fumlost:1,
    recs:15,
    tars:20,
    recyards:87,
    rectuddies:1
    
    
    })

//te stats input
db.getCollection('Players').insert({
    name:'Delanie Walker',
    POS:'TE',
    team:'Titans',
    gp:5,
    recs:17,
    tars:29,
    recyards:246,
    rectuddies:2,
    fum:1,
    fumlost:0
    
    
    })