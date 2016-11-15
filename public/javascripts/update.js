function updateTable(pos, data){
  var table = document.getElementById("table");
  table.innerHTML = '<tr class="header">          <td>Name</td>          <td>Team</td>          <td>Position</td>          <td>Games Played</td>          <td>Receptions</td>          <td>Reception TDs</td>          <td>Rush TDs</td>          </tr>';
  if(pos == 'all'){
    data.forEach(function(Player) {
      if(Player.name != 'name'){
        var tr = document.createElement("tr");
        tr.innerHTML = "<tr>          <td>" + Player.name + "</td>          <td>" + Player.team + "</td>          <td>" + Player.POS + "</td>          <td>" + Player.gp + "</td>          <td>" + Player.recs + "</td>          <td>" + Player.rectuddies + "</td>          <td>" + Player.rushtuddies + "</td>        </tr>";
        table.appendChild(tr);
      }
    });
  }else if(pos == 'FLEX'){
    data.forEach(function(Player) {
      if(Player.POS == 'WR' || Player.POS == 'RB'){
        var tr = document.createElement("tr");
        tr.innerHTML = "<tr>          <td>" + Player.name + "</td>          <td>" + Player.team + "</td>          <td>" + Player.POS + "</td>          <td>" + Player.gp + "</td>          <td>" + Player.recs + "</td>          <td>" + Player.rectuddies + "</td>          <td>" + Player.rushtuddies + "</td>        </tr>";
        table.appendChild(tr);
      }
    });
  }else{
    data.forEach(function(Player) {
      if(Player.POS == pos){
        var tr = document.createElement("tr");
        tr.innerHTML = "<tr>          <td>" + Player.name + "</td>          <td>" + Player.team + "</td>          <td>" + Player.POS + "</td>          <td>" + Player.gp + "</td>          <td>" + Player.recs + "</td>          <td>" + Player.rectuddies + "</td>          <td>" + Player.rushtuddies + "</td>        </tr>";
        table.appendChild(tr);
      }
    });
  }
} 

function searchPlayer(data){
  var name = document.getElementById("playerSearch").value;
  var table = document.getElementById("table");
  table.innerHTML = '<tr class="header">          <td>Name</td>          <td>Team</td>          <td>Position</td>          <td>Games Played</td>          <td>Receptions</td>          <td>Reception TDs</td>          <td>Rush TDs</td>          </tr>';
  data.forEach(function(Player) {
    if(Player.name == name){
      var tr = document.createElement("tr");
      tr.innerHTML = "<tr>          <td>" + Player.name + "</td>          <td>" + Player.team + "</td>          <td>" + Player.POS + "</td>          <td>" + Player.gp + "</td>          <td>" + Player.recs + "</td>          <td>" + Player.rectuddies + "</td>          <td>" + Player.rushtuddies + "</td>        </tr>";
      table.appendChild(tr);
    }
  });
}

function sort(param, data){
  // sort by value
  if(param == 'gp'){
    data.sort(function (a, b) {
      if (a.gp > b.gp) {
        return 1;
      }
      if (a.gp < b.gp) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  updateTable('all', data);
}