const WebSocket = require('ws');

var set_id = 1;
var limit_players = 5;
var package = {};
var players = {};
var PORT = process.env.PORT || 3000;

var ws = new WebSocket.Server({
  port: PORT,
  host: "0.0.0.0",
  perMessageDeflate: false,
});

function get_datetime (){
  const now = new Date();

  const tanggal = now.getDate();

  const bulanNama = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const bulan = bulanNama[now.getMonth()];

  const tahun = now.getFullYear();

  const jam = String(now.getHours()).padStart(2, '0');
  const menit = String(now.getMinutes()).padStart(2, '0');
  const detik = String(now.getSeconds()).padStart(2, '0');

  // return `${tanggal} ${bulan} ${tahun}, ${jam}:${menit}:${detik}`;
  return `${jam}:${menit}`;
}


ws.on('connection', function (client){
  
  package = {
    type: 'login',
    id: set_id,
  };
  package = JSON.stringify(package);
  client.send(package);
  client['player_id'] = set_id;
  set_id = set_id + 1;
  update_players();

  // on message - START
  client.on('message', function (message){
    message = message.toString();
    message = JSON.parse(message);

    // login player - START
    if (message.type == 'login_player'){
      if (Object.keys(players).length < limit_players){
        players[message.player_id] = {
          username: message.username,
          hero: message.hero,
          move: {
            x: 0,
            y: 0,
            jump: 0,
          },
        };

        package = {
          type: 'login_successfully',
        };
        package = JSON.stringify(package);
        client.send(package);
        update_players();
      }else{
        package = {
          type: 'login_failed',
          error_status: 'error',
          error_message: 'Server room is full !',
        };
        package = JSON.stringify(package);
        client.send(package);
      }
    }
    // login player - END

    // check player limit - START
    if (message.type == 'check_player_limit'){
      let limit = 'available';
      if (Object.keys(players).length < limit_players){
        limit = 'available';
      }else{
        limit = 'full';
      }
      package = {
        type: 'status_player_limit',
        limit: limit,
      };
      package = JSON.stringify(package);
      client.send(package);
    }
    // check player limit - END

    // touch button - START
    if (message.type == 'touch_button'){
      let touch_index = message.touch_index;
      let player_index = message.player_index;
      let player_id = message.player_id;
      if (players[player_id] != undefined){
        players[player_id]['move']['jump'] = 5;
        ws.clients.forEach(function (cs){
          package = {
            type: message.type,
            touch_index: touch_index,
            player_index: player_index,
            player_id: player_id,
            jump: players[player_id]['move']['jump'],
          };
          package = JSON.stringify(package);
          cs.send(package);
        });
      }
    }
    // touch button - END

    // update move y - START
    if (message.type == 'update_move_y'){
      let id = message.id;
      let move_y = message.move_y;
      if (players[id] != undefined){
        players[id]['move']['y'] = move_y;
        players[id]['move']['jump'] = 0;
        ws.clients.forEach(function (cs){
          if (cs['player_id'] != client['player_id']){
            package = {
              type: message.type,
              id: id,
              move_y: move_y,
            };
            package = JSON.stringify(package);
            cs.send(package);
          }
        });
      }
    }
    // update move y - END

    // move left - START
    if (message.type == 'move_left'){
      let id = message.id;
      let speed = message.speed;
      if (players[id] != undefined){
        players[id]['move']['x'] = players[id]['move']['x'] - (speed / 2);
        if (players[id]['move']['x'] < -1){
          players[id]['move']['x'] = 0;
        }
        ws.clients.forEach(function (cs){
          package = {
            type: message.type,
            id: id,
            move_x: players[id]['move']['x'],
          };
          package = JSON.stringify(package);
          cs.send(package);
        });
      }
    }
    // move left - END

    // move right - START
    if (message.type == 'move_right'){
      let id = message.id;
      let speed = message.speed;
      if (players[id] != undefined){
        players[id]['move']['x'] = players[id]['move']['x'] + (speed / 2);
        if (players[id]['move']['x'] > (992 - 70)){
          players[id]['move']['x'] = (992 - 71);
        }
        ws.clients.forEach(function (cs){
          package = {
            type: message.type,
            id: id,
            move_x: players[id]['move']['x'],
          };
          package = JSON.stringify(package);
          cs.send(package);
        });
      }
    }
    // move right - END

    // jump - START
    if (message.type == 'jump'){
      let id = message.id;
      if (players[id] != undefined){
        players[id]['move']['jump'] = 13;
        ws.clients.forEach(function (cs){
          package = {
            type: message.type,
            id: id,
            jump: players[id]['move']['jump'],
          };
          package = JSON.stringify(package);
          cs.send(package);
        });
      }
    }
    // jump - END

    // player get coin - START
    if (message.type == 'player_get_coin'){
      let id = message.id;
      let coin_index = message.coin_index;
      let total_coin = message.total_coin;
      ws.clients.forEach(function (cs){
        if (cs['player_id'] != client['player_id']){
          package = {
            type: message.type,
            id: id,
            coin_index: coin_index,
            total_coin: total_coin,
          };
          package = JSON.stringify(package);
          cs.send(package);
        }
      });
    }
    // player get coin - END

    // player hit - START
    if (message.type == 'player_hit'){
      let id = message.id;
      let id_x = message.id_x;
      players[id]['move']['jump'] = 5;
      ws.clients.forEach(function (cs){
        package = {
          type: message.type,
          id: id,
          id_x: id_x,
          jump: players[id]['move']['jump'],
        };
        package = JSON.stringify(package);
        cs.send(package);
      });
    }
    // player hit - END

    // send chat - START
    if (message.type == 'send_chat'){
      let id = message.id;
      let text = message.text;
      let total_coin = message.total_coin;

      ws.clients.forEach(function (cs){
        package = {
          type: 'new_chat',
          id: id,
          text: text,
          total_coin: total_coin,
          datetime: get_datetime(),
        };
        package = JSON.stringify(package);
        cs.send(package);
      });
    }
    // send chat - END

  });
  // on message - END

  client.on('close', function (){
    Object.keys(players).forEach(function (player_id){
      if (player_id == client['player_id']){
        delete players[player_id];
      }
    });
    update_players();
  });

});

function update_players (){
  if (Object.keys(players).length > 0){
    ws.clients.forEach(function (client){
      package = {
        type: 'update_players',
        data: players,
      };
      package = JSON.stringify(package);
      client.send(package);
    });
  }
}

function index_coin (){
  return Math.floor(Math.random() * 59);
}

function share_coin (){
  if (Object.keys(players).length > 0){
    let set_index = index_coin();
    ws.clients.forEach(function (cs){
      package = {
        type: 'put_coin',
        set_index: set_index,
      };
      package = JSON.stringify(package);
      cs.send(package);
    });
    setTimeout(function (){
      share_coin();
    }, 9000);
  }else{
    setTimeout(function (){
      share_coin();
    }, 1000);
  }
}
share_coin();

let message = `WebSocket running on ws://localhost:${PORT}`;
console.log(message);