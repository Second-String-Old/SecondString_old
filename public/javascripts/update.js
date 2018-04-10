// var pheader = '<tr class="header">          <td><a href="javascript:sort(&quot;name&quot;, arr)">Name</a></td>          <td><a href="javascript:sort(&quot;data[i]&quot;, arr)">Team</a></td>          <td><a href="javascript:sort(&quot;POS&quot;, arr)">Position</a></td>          <td><a href="javascript:sort(&quot;gp&quot;, arr)">Games Played</a></td>          <td><a href="javascript:sort(&quot;recs&quot;, arr)">Receptions</a></td>          <td><a href="javascript:sort(&quot;yards&quot;, arr)">Yards</a></td>          <td><a href="javascript:sort(&quot;rectuddies&quot;, arr)">Reception TDs</a></td>          <td><a href="javascript:sort(&quot;rushtuddies&quot;, arr)">Rush TDs</a></td>        </tr>'
var theader = '<tr class="header"> <td><a href="javascript:Tsort(&quot;name&quot;, arr)">Name</a></td> <td><a href="javascript:Tsort(&quot;div&quot;, arr)">Division</a></td></tr>';
var currpos = 'all';
var header = '<thead class="header"> <td><a href="javascript:sort(&quot;lastname&quot;, arr)">Name</a></td> <td><a href="javascript:sort(&quot;team&quot;, arr)">Team</a></td> <td><a href="javascript:sort(&quot;pos&quot;, arr)">Position</a></td> <td><a href="javascript:sort(&quot;yards&quot;, arr)">Yards</a></td> <td><a href="javascript:sort(&quot;passing_tds&quot;, arr)">Passing TDs</a></td> <td><a href="javascript:sort(&quot;passing_int&quot;, arr)">INTs</a></td> <td><a href="javascript:sort(&quot;rectuddies&quot;, arr)">Reception TDs</a></td> <td><a href="javascript:sort(&quot;rushtuddies&quot;, arr)">Rush TDs</a></td></thead>';

function updateTable(pos, data){

  function updateCell(i) {
    var tr = document.createElement('tr');
    var tstring = '<td>' + data[i].firstname + " " + data[i].lastname + '</td> <td>' + data[i].team + '</td> <td>' + data[i].pos + '</td>';
    if (data[i].pos == 'QB') {
      tstring = tstring + '<td>' + data[i].passing_yds + '</td>';
    }
    else if (data[i].pos == 'WR') {
      tstring = tstring + '<td>' + data[i].receiving_yds + '</td>';
    }
    else if (data[i].pos == 'RB') {
      tstring = tstring + '<td>' + data[i].rushing_yds + '</td>';
    }
    else {
      tstring = tstring + '<td>0</td>';
    }
    tstring = tstring + '<td>' + data[i].passing_tds + '</td> <td>' + data[i].passing_int + '</td> <td>' + data[i].receiving_tds + '</td> <td>' + data[i].rushing_tds + '</td>';
    // tr.innerHTML = "<tr>          <td>" + data[i].name + "</td>          <td>" + data[i].team + "</td>          <td>" + data[i].POS + "</td>          <td>" + data[i].gp + "</td>          <td>" + data[i].recs + "</td>          <td>" + data[i].pyards  + "</td>          <td>" + data[i].rectuddies + "</td>          <td>" + data[i].rushtuddies + "</td>        </tr>";
    tr.innerHTML = tstring;
    table.appendChild(tr);
    return { tr, tstring };
  }

  var table = document.getElementById('table');
  table.innerHTML = header;
  currpos = pos;
  if(pos == 'all'){
    for(var i = 0; i < data.length; i++){
      var { tr, tstring } = updateCell(i);
    }
  }else if(pos == 'FLEX'){
    for(var i = 0; i < data.length; i++){
      if(data[i].pos == 'WR' || data[i].pos == 'RB'){
        var { tr, tstring } = updateCell(i);        
      }
    }
  }else{
    for(i = 0; i < data.length; i++){
      if(data[i].pos == pos){
        var { tr, tstring } = updateCell(i);
      }
    }
  }
} 

function updateTTable(data){
  var table = document.getElementById('table');
  table.innerHTML = theader;
  for(i = 0; i < data.length, i < 10; i++){
    if(data[i].name != 'name'){
      var tr = document.createElement('tr');
      tr.innerHTML = '<tr>          <td>' + data[i].name + '</td>          <td>' + data[i].div + '</td>';
      table.appendChild(tr);
    }
  }
} 

function searchPlayer(data){
  var name = document.getElementById('playerSearch').value;
  var table = document.getElementById('table');
  // table.innerHTML = '<tr class="header">          <td>Name</td>          <td>data[i]</td>          <td>Position</td>          <td>Games Played</td>          <td>Receptions</td>          <td>Reception TDs</td>          <td>Rush TDs</td>          </tr>';
  table.innerHTML = header;
  data.forEach(function(Player) {
    if(Player.name == name){
      var tr = document.createElement('tr');
      tr.innerHTML = '<tr>          <td>' + Player.name + '</td>          <td>' + Player.team + '</td>          <td>' + Player.POS + '</td>          <td>' + Player.gp + '</td>          <td>' + Player.recs + '</td>          <td>' + (Player.rushyards + Player.recyards)  + '</td>          <td>' + Player.rectuddies + '</td>          <td>' + Player.rushtuddies + '</td>        </tr>';
      table.appendChild(tr);
    }
  });
}

function searchTeam(data){
  var name = document.getElementById('teamSearch').value;
  var table = document.getElementById('table');
  table.innerHTML = header;
  data.forEach(function(Team) {
    if(Team.name == name){
      var tr = document.createElement('tr');
      tr.innerHTML = '<tr>          <td>' + Team.name + '</td>          <td>' + Team.team + '</td>          <td>' + Team.POS + '</td>          <td>' + Team.gp + '</td>          <td>' + Team.recs + '</td>          <td>' + (Team.rushyards + Team.recyards)  + '</td>          <td>' + Team.rectuddies + '</td>          <td>' + Team.rushtuddies + '</td>        </tr>';
      table.appendChild(tr);
    }
  });
}

function sort(param, data){
  //sort by name
  if(param == 'lastname'){
    data.sort(function (a, b) {
      if (a.lastname > b.lastname) {
        return 1;
      }
      if (a.lastname < b.lastname) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  //sort by team
  if(param == 'team'){
    data.sort(function (a, b) {
      if (a.team > b.team) {
        return 1;
      }
      if (a.team < b.team) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  //sort by POS
  if(param == 'pos'){
    data.sort(function (a, b) {
      if (a.pos > b.pos) {
        return 1;
      }
      if (a.pos < b.pos) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  // sort by games played
  if(param == 'yards'){
    data.sort(function (a, b) {
      if ((a.passing_yds + a.rushing_yds + a.receiving_yds) > (b.passing_yds + b.rushing_yds + b.receiving_yds)) {
        return 1;
      }
      if ((a.passing_yds + a.rushing_yds + a.receiving_yds) < (b.passing_yds + b.rushing_yds + b.receiving_yds)) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  // sort by receptions
  if(param == 'passing_tds'){
    data.sort(function (a, b) {
      if (a.passing_tds > b.passing_tds) {
        return 1;
      }
      if (a.passing_tds < b.passing_tds) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  // sort by rectuddies
  if(param == 'passing_int'){
    data.sort(function (a, b) {
      if (a.passing_int > b.passing_int) {
        return 1;
      }
      if (a.passing_int < b.passing_int) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  // sort by rushtuddies
  if(param == 'rushtuddies'){
    data.sort(function (a, b) {
      if (a.rushtuddies > b.rushtuddies) {
        return 1;
      }
      if (a.rushtuddies < b.rushtuddies) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  updateTable(currpos, data);
}

function Tsort(param, data){
  //sort by name
  if(param == 'name'){
    data.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  //sort by div
  if(param == 'div'){
    data.sort(function (a, b) {
      if (a.div > b.div) {
        return 1;
      }
      if (a.div < b.div) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  updateTTable(data);
}