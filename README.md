# SecondString

Second String aims to take a new look at sports statistcal analysis.  The website will project future performance of athletes across a wide variety of different sports.  
We will analyze career trends with miscellaneous other factors to try and provide an accurate projection of future performace.

Currently in the early stages of development.  We are focusing on the NFL first and are in the process of populating our Mongo Database and creating our actual website using the MEAN stack.
The Mongo DB is up and the website is connected to the DB and able to pull and display data.  We have added a dynamic table view for the player statistics and we are able to sort the table as
well as search from a search box we added.  We have been playing around with the color scheme to make the view more appealing.  Now we are focused on fully populating our database.  We have 
some data files that we are going to pull from and cross reference with online data.

The database is set up with 20 indexes for players:
    name:'name',
    POS:'pos',
    team:'team',
    num:0,          //jersey number
    gp:0,           //games played
    att:0,          //number of rushing attempts
    rushyards:0,  
    rushtuddies:0,
    recs:0,         //receptions
    tars:0,         //targets
    recyards:0,
    rectuddies:0,
    comp:0,       //completions
    passatt:0,    //pass attempts
    pyards:0,
    ptds:0,
    ints:0,
    fum:0,
    fumlost:0
    
More information as well as a blog can be found here : rcos.io/projects/cwilliamson226/secondstring/profile
