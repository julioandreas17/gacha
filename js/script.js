/* fullscreen
document.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
});
*/

var ws = new WebSocket('ws://'+ HOST +':8000');

var FPS = 1;
var speed = 10;
var control = {
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

var touches = {};
var touch_animate = {
  idle: 'Sprites/Tiles/Default/switch_blue.png',
  touch: 'Sprites/Tiles/Default/switch_blue_pressed.png',
};

var player_animate = {
  idle: 'Sprites/Characters/Default/character_variable_idle.png',
  walk_a: 'Sprites/Characters/Default/character_variable_walk_a.png',
  walk_b: 'Sprites/Characters/Default/character_variable_walk_b.png',
  jump: 'Sprites/Characters/Default/character_variable_jump.png',
  coin: 'Sprites/Tiles/Default/coin_gold.png',
};

var player_heart = 3;
var player_coin = 0;
var player_id = 0;
var players = {};
var package = {};
var player_dimencity = {
  width: 70,
  height: 70,
};
var direction = {};
var hit_delay = {};

function update_move_player (direction){
  package = {
    type: 'update_move_player',
    id: player_id,
    direction: direction,
    speed: speed,
  };
  package = JSON.stringify(package);
  ws.send(package);
}

function players_move (){
  let player = $('.players').find('.player');
  if (player.length > 0){
    player.each(function (index, element){
      let selected = $(element);
      let img = selected.find('img[alt="hero"]');
      let id = selected.attr('player-id');
      let direction_x = 0;
      let direction_y = 0;
      let walk = 'walk_a';
      let animate = '';

      if (direction[id] != undefined){
        direction_x = direction[id]['x'];
        direction_y = direction[id]['y'];
        walk = direction[id]['walk'];
      }

      if (players[id] != undefined){
        let hero = players[id]['hero'];
        let move_x = players[id]['move']['x'];
        let move_y = players[id]['move']['y'];

        if (FPS % 5 == 0){
          if (walk == 'walk_a'){
            walk = 'walk_b';
          }else{
            walk = 'walk_a';
          }
        }

        if (direction_y == move_y){
          if (move_x != direction_x){
            animate = player_animate[walk].replaceAll('variable', hero);
          }else{
            animate = player_animate['idle'].replaceAll('variable', hero);
          }
        }else{
          animate = player_animate['jump'].replaceAll('variable', hero);
        }

        if (move_x > direction_x){
          img.css('transform', 'scaleX(1)');
        }

        if (move_x < direction_x){
          img.css('transform', 'scaleX(-1)');
        }

        img.attr('src', animate);
        selected.css('translate', `${move_x}px ${move_y}px`);

        direction[id] = {
          x: move_x,
          y: move_y,
          walk: walk,
        };
      }
    });
  }
}

function velocity (){
  let player = $('.players').find('.player');
  if (player.length > 0){
    player.each(function (index, element){
      let selected = $(element);
      let id = selected.attr('player-id');
      let jump = 0;
      if (players[id] != undefined){
        jump = players[id]['move']['jump'];
      }
      let over_y = collusion_y(selected);
      // console.log(over_y);

      if (jump > 0){
          if (players[id] != undefined){
            players[id]['move']['y'] = players[id]['move']['y'] - speed;
            players[id]['move']['jump'] = jump - 1;
          }
      }else{
        if (Math.ceil(over_y) < 1){
          if (players[id] != undefined){
            players[id]['move']['y'] = players[id]['move']['y'] + speed;
          }
        }

        if (over_y > 1){
          if (players[id] != undefined){
            over_y = over_y - (over_y - 1);
            if (over_y < 1){
              over_y = 1;
            }
            players[id]['move']['y'] = players[id]['move']['y'] - over_y;
            if (id == player_id){
              package = {
                type: 'update_move_y',
                id: player_id,
                move_y: players[id]['move']['y'],
              };
              package = JSON.stringify(package);
              ws.send(package);
            }
          }
        }
      }
    });
  }
}

function collusion_y (player){
  let over_y = 0;
  let player_offset = player.offset();
  let obstacles = $('.obstacle');
  obstacles.each(function (index, element){
    let selected = $(element);
    let offset = selected.offset();
    let top = false;
    let left = false;
    let right = false;
    let divider = player.width() - selected.width();
    divider = divider + 20;

    if ((player_offset.top + player.height()) > offset.top && (player_offset.top + player.height()) < (offset.top + speed)){
      top = true;
    }

    if ((player_offset.left + divider) > offset.left && (player_offset.left + divider) < (offset.left + selected.width())){
      left = true;
    }

    if ((player_offset.left + player.width()) - divider > offset.left && (player_offset.left + player.width()) - divider < (offset.left + selected.width())){
      right = true;
    }

    if (top == true && (left == true || right == true)){
      over_y = player_offset.top + player.height();
      over_y = over_y - offset.top;
    }
  });
  return over_y;
}

function catch_coin (){
  let player = $('.player[player-id="'+ player_id +'"]');
  if (player.length > 0){
    let player_offset = player.offset();

    $('.coin').each(function (index, element){
      let selected_element = $(element);
      let coin_offset = selected_element.offset();
      let in_area = 0;
      let top = false;
      let bottom = false;
      let left = false;
      let right = false;

      if (selected_element.hasClass('get-coin') == true){
        if (
          (player_offset.top + (player.height() / 2)) > coin_offset.top && (player_offset.top + (player.height() / 2)) < (coin_offset.top + selected_element.height())
        ){
          top = true;
        }

        if (
          (player_offset.top + player.height()) - 10 > coin_offset.top && (player_offset.top + player.height()) - 10 < (coin_offset.top + selected_element.height())
        ){
          bottom = true;
        }

        if (
          player_offset.left + 30 > coin_offset.left && player_offset.left + 30 < (coin_offset.left + selected_element.width())
        ){
          left = true;
        }

        if (
          (player_offset.left + player.width()) - 30 > coin_offset.left && (player_offset.left + player.width()) - 30 < (coin_offset.left + selected_element.width())
        ){
          right = true;
        }
      }

      if (
        top == true && (left == true || right == true)
      ){
        in_area = in_area + 1;
      }

      if (
        bottom == true && (left == true || right == true)
      ){
        in_area = in_area + 1;
      }

      if (
        left == true && (top == true || bottom == true)
      ){
        in_area = in_area + 1;
      }

      if (
        right == true && (top == true || bottom == true)
      ){
        in_area = in_area + 1;
      }
      
      if (in_area > 0){
        selected_element.removeClass('get-coin').removeAttr('style');
        player_coin = player_coin + 1;
        player.find('.coin').html(player_coin);

        package = {
          type: 'player_get_coin',
          id: player_id,
          coin_index: index,
          total_coin: player_coin,
        };
        package = JSON.stringify(package);
        ws.send(package);
      }
    });
  }
}

function clouds_animate (){
  let clouds = document.querySelectorAll('.cloud');
  clouds.forEach(function (cloud){
    cloud.style.backgroundPosition = `${FPS}px 0px`;
  });
}

function controller (){
  if (control['ArrowLeft'] == true){
    package = {
      type: 'move_left',
      id: player_id,
      speed: speed,
    };
    package = JSON.stringify(package);
    ws.send(package);
  }

  if (control['ArrowRight'] == true){
    package = {
      type: 'move_right',
      id: player_id,
      speed: speed,
    };
    package = JSON.stringify(package);
    ws.send(package);
  }

  if (control['ArrowUp'] == true){
    if (control['Space'] != undefined && control['Space'] == true){
      document.querySelector('.chat').querySelector('.area').scrollTo(0, $('.chat').find('.area').scrollTop() - speed);
    }else{
      if (players[player_id] != undefined){
        let player_element = $('.player[player-id="'+ player_id +'"]');
        let over_y = collusion_y(player_element);
        let jump = players[player_id]['move']['jump'];
        if (jump < 1 && (over_y > 0 && over_y < 2)){
          package = {
            type: 'jump',
            id: player_id,
          };
          package = JSON.stringify(package);
          ws.send(package);
        }
      }
    }
  }

  if (control['ArrowDown'] != undefined && control['ArrowDown'] == true){
    if (control['Space'] != undefined && control['Space'] == true){
      document.querySelector('.chat').querySelector('.area').scrollTo(0, $('.chat').find('.area').scrollTop() + speed);
    }
  }
}

function touch_button_delay (){
  let touch = $('.touch');
  if (touch.length > 0){
    touch.each(function (index, element){
      let selected_element = $(element);

      if (touches[index] != undefined){
        if (touches[index] > 0){
          touches[index] = touches[index] - 1;
        }else{
          selected_element.removeClass('touched');
          delete touches[index];
        }
      }

      if (selected_element.hasClass('touched') == true){
        selected_element.css('background', 'url('+ touch_animate['touch'] +')').css('background-size', '100% 100%');
        if (touches[index] == undefined){
          touches[index] = 50;
        }
      }else{
        selected_element.css('background', 'url('+ touch_animate['idle'] +')').css('background-size', '100% 100%');
      }
    });
  }
}

function touch_button (){
  let player = $('.player');
  if (player.length > 0){
    player.each(function (index, element){
      let player_element = $(element);
      let id = player_element.attr('player-id');
      let jump = 0;
      if (players[id] != undefined){
        jump = players[id]['move']['jump'];
      }
      if (jump < 1){
        let player_offset = player_element.offset();
        let touch = $('.touch');
        if (touch.length > 0){
          touch.each(function (index_touch, element_touch){
            let touch_element = $(element_touch);
            if (touch_element.hasClass('touched') == false){
              let touch_offset = touch_element.offset();
              if (
                ((player_offset.top + player_element.height()) > touch_offset.top && (player_offset.top + player_element.height()) < (touch_offset.top + 15)) && 
                (
                  ((player_offset.left + 15) > touch_offset.left && (player_offset.left + 15) < (touch_offset.left + touch_element.width())) || 
                  (((player_offset.left + player_element.width()) - 15) > touch_offset.left && ((player_offset.left + player_element.width()) - 15) < (touch_offset.left + touch_element.width()))
                )
              ){
                package = {
                  type: 'touch_button',
                  touch_index: index_touch,
                  player_index: index,
                  player_id: id,
                };
                package = JSON.stringify(package);
                ws.send(package);
              }
            }
          });
        }
      }
    });
  }
}

function chat_focus (){
  if (players[player_id] != undefined){
    let player = $('.player[player-id="'+ player_id +'"]');
    if (player.length > 0){
      let player_offset = player.offset();
      let chat = $('.chat');
      let chat_offset = chat.offset();
      $('.chat').find('input[name="message_text"]').focus();
      if (
        (player_offset.top + (player.height() / 2) > chat_offset.top && player_offset.top + (player.height() / 2) < chat_offset.top + chat.height()) && 
        (
          (player_offset.left + 20 > chat_offset.left && player_offset.left + 20 < chat_offset.left + chat.width()) || 
          ((player_offset.left + player.width()) - 20 > chat_offset.left && (player_offset.left + player.width()) - 20 < chat_offset.left + chat.width())
        )
      ){
        $('.chat').find('input[name="message_text"]').focus();
      }else{
        $('.chat').find('input[name="message_text"]').blur();
      }
    }
  }
}

function player_hit_delay (){
  if ($('.player').length > 0){
    $('.player').each(function (index, element){
      let player = $(element);
      let id = player.attr('player-id');
      if (player.hasClass('hit') == true && hit_delay[id] != undefined){
        if (FPS % 10 == 0){
          hit_delay[id] = hit_delay[id] - 1;
        }
        if (hit_delay[id] % 2 == 0){
          player.find('.row').eq(1).css('opacity', '0');
        }else{
          player.find('.row').eq(1).css('opacity', '1');
        }
        if (hit_delay[id] < 1){
          delete hit_delay[id];
          player.removeClass('hit');
          player.find('.row').eq(1).css('opacity', '1');
        }
      }
    });
  }
}

function player_hit (){
  if ($('.player').length > 0){
    $('.player').each(function (index, element){
      let player = $(element);
      let id = player.attr('player-id');
      let player_offset = player.offset();
      let jump = 0;
      if (players[id] != undefined){
        jump = players[id]['move']['jump'];
      }

      $('.player').each(function (index_x, element_x){
        let player_x = $(element_x);
        let id_x = player_x.attr('player-id');
        let player_x_offset = player_x.offset();
        let jump_x = 0;
        if (players[id_x] != undefined){
          jump_x = players[id_x]['move']['jump'];
        }
        if (id != id_x && (jump < 1 && jump_x < 1) && (player.hasClass('hit') == false && player_x.hasClass('hit') == false)){

          if (
            (player_offset.top + player.height() > player_x_offset.top + (player_x.height() / 2) && player_offset.top + player.height() < player_x_offset.top + (player_x.height() / 2) + 15) && 
            (
              (player_offset.left + 20 > player_x_offset.left + 20 && player_offset.left + 20 < (player_x_offset.left + player_x.width()) - 20) || 
              ((player_offset.left + player.width()) - 20 > player_x_offset.left + 20 && (player_offset.left + player.width()) - 20 < (player_x_offset.left + player_x.width()) - 20)
            )
          ){
            player_x.addClass('hit');
            package = {
              type: 'player_hit',
              id: id,
              id_x: id_x,
            };
            package = JSON.stringify(package);
            ws.send(package);
          }

        }
      });

    });
  }
}

function render (){
  clouds_animate();
  controller();
  players_move();
  velocity();
  touch_button_delay();
  touch_button();
  catch_coin();
  chat_focus();
  player_hit();
  player_hit_delay();
  FPS = FPS + 1;
  requestAnimationFrame(function (){
    render();
  });
}

render();

function show_popup (status, message){
  let color = '';
  let icon = '';

  if (status == 'success'){
    color = 'bg-success text-white';
    icon = '<i class="bi bi-check2-all"></i>';
  }

  if (status == 'warning'){
    color = 'bg-warning';
    icon = '<i class="bi bi-exclamation-triangle"></i>';
  }

  if (status == 'error' || status == 'danger'){
    color = 'bg-danger text-white';
    icon = '<i class="bi bi-x-circle"></i>';
  }

  let generate = `
    <div class="${color} position-relative py-2 px-3 m-3 shadow-sm" style="border-radius: 10px;">
      ${icon} ${message}
    </div>
  `;

  $('.popup').prepend(generate);
  setTimeout(function (){
    $('.popup').find('div').eq(0).remove();
  }, 4000);
}

function check_player_limit (){
  package = {
    type: 'check_player_limit',
  };
  package = JSON.stringify(package);
  ws.send(package);
}

$('body').find('.login').on('click', 'img[alt="hero"]', function (event){
  let selected = $(this);
  $('.login').find('img[alt="hero"]').each(function (index, element){
    $(element).removeClass('bg-success').addClass('bg-white');
  });
  selected.removeClass('bg-white').addClass('bg-success');
});

$('body').find('.login').on('click', '.button', function (event){
  let button = $(this);
  let username = $('.login').find('input[name="username"]').val();
  let hero = '';
  $('.login').find('img[alt="hero"]').each(function (index, element){
    if ($(element).hasClass('bg-success') == true){
      hero = $(element).attr('value');
    }
  });
  if (username == ''){
    show_popup('warning', 'Please set your username !');
  }else if (username.length > 10){
    show_popup('warning', 'Max of length username is 10');
  }else if (hero == ''){
    show_popup('warning', 'Choose your hero !');
  }else{
    button.prop('disabled', true).html(`Process ...`);

    package = {
      type: 'login_player',
      player_id: player_id,
      username: username,
      hero: hero,
    };
    package = JSON.stringify(package);
    ws.send(package);
  }
});

function generate_player (player_id, username, hero, move_x, move_y){
  let generate = `
    <div class="player position-absolute start-0 top-0 d-flex align-items-center justify-content-center" player-id="${player_id}" style="translate: ${move_x}px ${move_y}px;">
      <div class="position-absolute start-0 end-0 top-0 d-flex justify-content-center">
        <div class="row">
          <div class="col-12">
            <div align="center">
              <img src="Sprites/Tiles/Default/coin_gold.png" alt="coin" style="width: 20px;height: 20px;">x <span class="coin">0</span>
            </div>
            <div class="text-truncate" align="center">
              ${username}
            </div>
            <div align="center">
              <i class="bi bi-caret-down-fill"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row position-relative mt-3">
        <div class="col-12 mt-4">
          <img src="Sprites/Characters/Default/character_${hero}_idle.png" alt="hero" style="width: ${player_dimencity['width']}px;height: ${player_dimencity['height']}px;">
        </div>
      </div>
    </div>
  `;
  $('.players').append(generate);
  show_popup('success', username + ' has been join !');
}

$('body').find('.chat').on('keyup', 'input[name="message_text"]', function (event){
  if (event.code == 'Enter'){

    let input = $(this);
    let message = input.val();
    if (message == ''){
      show_popup('warning', 'Type your message !');
    }else{
      if (player_coin < 2){
        show_popup('error', 'Collect 2 coins to send message !');
      }else{
        input.val('');
        player_coin = player_coin - 2;
        if (player_coin < 0){
          player_coin = 0;
        }
        $('.player[player-id="'+ player_id +'"]').find('.coin').html(player_coin);
        package = {
          type: 'send_chat',
          id: player_id,
          text: message,
          total_coin: player_coin,
        };
        package = JSON.stringify(package);
        ws.send(package);
      }
    }

  }
});

function append_chat (id, username, hero, text, time){
  let other_chat = `
    <div class="w-100 position-relative">
      <div class="row mb-3">
        <div class="col-auto">
          <div class="position-relative ps-5">
            <div class="position-absolute start-0 bottom-0">
              <img src="Sprites/Tiles/Default/hud_player_helmet_${hero}.png" alt="profile" class="rounded-circle" style="width: 40px;height: 40px;">
            </div>
            <div class="text-truncate mb-1">
              ${username} 
            </div>
            <div class="position-relative bg-warning p-2" style="border-radius: 5px;">
              <div class="row">
                <div class="col-auto">
                  ${text}
                </div>
                <div class="col-12">
                  <div class="mt-2" align="right">
                    <i class="bi bi-clock" style="font-size: 11px;"></i> ${time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">&nbsp;</div>
      </div>
    </div>
  `;

  let my_chat = `
    <div class="w-100 position-relative">
      <div class="row mb-3">
        <div class="col">&nbsp;</div>
        <div class="col-auto">
          <div class="position-relative pe-5">
            <div class="position-absolute end-0 bottom-0">
              <img src="Sprites/Tiles/Default/hud_player_helmet_${hero}.png" alt="profile" class="rounded-circle" style="width: 40px;height: 40px;">
            </div>
            <div class="text-truncate mb-1">
              ${username}
            </div>
            <div class="position-relative bg-success text-white p-2" style="border-radius: 5px;">
              <div class="row">
                <div class="col-auto">
                  ${text}
                </div>
                <div class="col-12">
                  <div class="mt-2" align="right">
                    <i class="bi bi-clock" style="font-size: 11px;"></i> ${time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (id == player_id){
    $('.chat').find('.area').append(my_chat);
  }else{
    $('.chat').find('.area').append(other_chat);
  }
}