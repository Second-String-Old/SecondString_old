function updateTable(pos, data){
  var table = document.getElementById("table");
  table.innerHTML = '<tr class="header">          <td>Name</td>          <td>Team</td>          <td>Position</td>          <td>Games Played</td>          <td>Receptions</td>          <td>Reception TDs</td>          <td>Rush TDs</td>          </tr>';
  // for(int i = 0; i < data.length(); i++){
  //   if(data[i].POS == pos){
  //     tr.innerHTML = "<tr>          <td>""Player.name</td>          <td>Player.team</td>          <td>Player.POS</td>          <td>Player.gp</td>          <td>Player.recs</td>          <td>Player.rectuddies</td>          <td>Player.rushtuddies</td>        </tr>";
  //     table.appendChild(tr);
  //   }
  // }
  data.forEach(function(Player) {
    //console.log("test");
    if(Player.POS == pos){
      var tr = document.createElement("tr");
      console.log("pos");
      tr.innerHTML = "<tr>          <td>" + Player.name + "</td>          <td>" + Player.team + "</td>          <td>" + Player.POS + "</td>          <td>" + Player.gp + "</td>          <td>" + Player.recs + "</td>          <td>" + Player.rectuddies + "</td>          <td>" + Player.rushtuddies + "</td>        </tr>";
      table.appendChild(tr);
    }
  });
} 