function character_scaleX (id, move_x){
  let player = $('.player[player-id="'+ id +'"]');
  if (player.length > 0){
    if (direction[id] != undefined){
      let direction_x = direction[id]['x'];
      if (direction_x < move_x){
        player.find('img[alt="hero"]').css('transform', 'scaleX(1)');
      }else{
        player.find('img[alt="hero"]').css('transform', 'scaleX(-1)');
      }
    }
  }
}

ws.addEventListener('message', function (message){
  message = JSON.parse(message.data);

  // login - START
  if (message.type == 'login'){
    player_id = message.id;

    let form = $('.login');
    let button = form.find('.button');

    form.removeClass('d-none');
    button.prop('disabled', false).html(`Let's Play !`);
  }
  // login - END

  // login successfully - START
  if (message.type == 'login_successfully'){
    let layout = $('.login');
    let button = layout.find('.button');

    layout.addClass('d-none');
    button.prop('disabled', false).html(`Let's Play !`);

    $('.hearts').removeClass('d-none');
    player_heart = 3;
    $('.hearts').find('.col-auto').eq(0).html('');
    for (let x = 1; x <= player_heart; x ++){
      let generate = `<img src="Sprites/Tiles/Default/hud_heart.png" alt="heart" style="width: 50px;">`;
      $('.hearts').find('.col-auto').eq(0).append(generate);
    }
  }
  // login successfully - END

  // player hit - START
  if (message.type == 'player_hit'){
    let id = message.id;
    let id_x = message.id_x;
    hit_delay[id_x] = 20;
    players[id]['move']['jump'] = message.jump;
    $('.player[player-id="'+ id_x +'"]').addClass('hit');
    if (player_id == id_x){
      player_heart = player_heart - 1;
      $('.hearts').find('.col-auto').eq(0).html('');
      for (let x = 1; x <= player_heart; x ++){
        let generate = `<img src="Sprites/Tiles/Default/hud_heart.png" alt="heart" style="width: 50px;">`;
        $('.hearts').find('.col-auto').eq(0).append(generate);
      }
    }
    if (player_heart < 1){
      player_heart = 0;
      ws.close();
      $('.game-over').removeClass('d-none');
    } 
  }
  // player hit - END

  // login failed - START
  if (message.type == 'login_failed'){
    let layout = $('.login');
    let button = layout.find('.button');
    let error_status = message.error_status;
    let error_message = message.error_message;
    show_popup(error_status, error_message);

    layout.addClass('d-none');
    button.prop('disabled', false).html(`Let's Play !`);

    setTimeout(function (){
      check_player_limit();
    }, 1000);
  }
  // login failed - END

  // status player limit - START
  if (message.type == 'status_player_limit'){
    let limit = message.limit;
    if (limit == 'full'){
      setTimeout(function (){
        check_player_limit();
      }, 1000);
    }else{
      let layout = $('.login');
      let button = layout.find('.button');

      layout.removeClass('d-none');
      button.prop('disabled', false).html(`Let's Play !`);
    }
  }
  // status player limit - END

  // update players - START
  if (message.type == 'update_players'){
    let players_ori = message.data;
    players = {};
    players = players_ori;

    if (Object.keys(players).length > 0){
      if ($('.players').find('.player').length < 1){
        Object.keys(players).forEach(function (player){
          generate_player(player, players[player]['username'], players[player]['hero'], players[player]['move']['x'], players[player]['move']['y']);
        });
      }

      $('.players').find('.player').each(function (index, element){
        let selected_element = $(element);
        let player_id = selected_element.attr('player-id');
        let found = 0;
        Object.keys(players).forEach(function (player){
          if (player == player_id){
            found = found + 1;
          }
        });
        if (found < 1){
          let username = selected_element.find('.text-truncate').eq(0).html();
          show_popup('error', username + ' was disconnect !');
          selected_element.remove();
        }
      });

      Object.keys(players).forEach(function (player){
        let found = 0;
        $('.players').find('.player').each(function (index, element){
          let selected_element = $(element);
          let player_id = selected_element.attr('player-id');
          if (player_id == player){
            found = found + 1;
          }
        });

        if (found < 1){
          generate_player(player, players[player]['username'], players[player]['hero'], players[player]['move']['x'], players[player]['move']['y']);
        }
      });
    }
  }
  // update players - END

  // touch button - START
  if (message.type == 'touch_button'){
    let touch_index = message.touch_index;
    let player_index = message.player_index;
    let player_id = message.player_id;
    let jump = message.jump;
    if (players[player_id] != undefined){
      players[player_id]['move']['jump'] = jump;
      $('.touch').eq(touch_index).addClass('touched');
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
    }
  }
  // update move y - END

  // move left - START
  if (message.type == 'move_left'){
    let id = message.id;
    let move_x = message.move_x;
    if (players[id] != undefined){
      character_scaleX (id, move_x);
      players[id]['move']['x'] = move_x;
    }
  }
  // move left - END

  // move right - START
  if (message.type == 'move_right'){
    let id = message.id;
    let move_x = message.move_x;
    if (players[id] != undefined){
      character_scaleX (id, move_x);
      players[id]['move']['x'] = move_x;
    }
  }
  // move right - END

  // jump - START
  if (message.type == 'jump'){
    let id = message.id;
    if (players[id] != undefined){
      players[id]['move']['jump'] = message.jump;
    }
  }
  // jump - END

  // put coin - START
  if (message.type == 'put_coin'){
    let set_index = message.set_index;
    let coin_img = player_animate['coin'];
    let element = $('.coin').eq(set_index);
    if (element.length > 0){
      element.css('background', 'url('+ coin_img +')').css('background-size', '100% 100%').addClass('get-coin');
      setTimeout(function (){
        element.removeClass('get-coin').removeAttr('style');
      }, 8000);
    }
  }
  // put coin - END

  // player get coin - START
  if (message.type == 'player_get_coin'){
    let id = message.id;
    let coin_index = message.coin_index;
    let total_coin = message.total_coin;
    let coin_element = $('.coin').eq(coin_index);
    let player = $('.player[player-id="'+ id +'"]');

    coin_element.removeClass('get-coin').removeAttr('style');
    player.find('.coin').html(total_coin);
  }
  // player get coin - END

  // new chat - START
  if (message.type == 'new_chat'){
    let id = message.id;
    let text = message.text;
    let total_coin = message.total_coin;
    let datetime = message.datetime;
    let chat_element = $('.chat');
    
    if (chat_element.find('.area').hasClass('d-none') == true){
      chat_element.find('.area').removeClass('d-none');
    }
    append_chat (id, players[id]['username'], players[id]['hero'], text, datetime);
    document.querySelector('.chat').querySelector('.area').scrollTo(0, $('.chat').find('.area')[0].scrollHeight);
    $('.player[player-id="'+ id +'"]').find('.coin').html(total_coin);
  }
  // new chat - END

});

ws.addEventListener('close', function (){
  show_popup('error', 'Server disconnect !');
});

ws.addEventListener('error', function (){
  show_popup('error', 'Server turn off !');
});