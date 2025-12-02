<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Multiplayer game online">

    <meta property="og:url" content="https://<?= $_SERVER['HTTP_HOST'] ?>/gacha">
    <meta property="og:title" content="GaCha App">
    <meta property="og:description" content="Multiplayer game online">
    <meta property="og:type" content="article">
    <meta property="og:image" content="Sprites/Tiles/Double/hud_player_helmet_yellow.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="100">
    <meta property="og:image:height" content="100">

    <link rel="shortcut icon" href="Sprites/Tiles/Default/hud_player_helmet_yellow.png" type="image/x-icon">
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css?v=<?= date('YmdHis') ?>">
    <link rel="stylesheet" href="vendor/twbs/bootstrap-icons/font/bootstrap-icons.min.css?v=<?= date('YmdHis') ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/style.css?v=<?= date('YmdHis') ?>">
    <title>Gacha App</title>
    <script src="js/jquery.min.js?v=<?= date('YmdHis') ?>"></script>
  </head>
  <body style="background: #ecf0f1;">
    <div class="wrapper position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden m-auto bg-warning" style="width: 992px;height: 576px;border-radius: 20px;">
      <?php 
        include('components/background.php');
        include('components/obstacle.php');
        include('components/chat.php');
        include('components/story.php');
        include('components/coin.php');
        include('components/player.php');
        include('components/login.php');
        include('components/game_over.php');
        include('components/popup.php');
      ?>
      <div class="position-absolute start-0 end-0 bottom-0 d-flex justify-content-center p-2">
        <div class="text-dark" align="center">
          Made with <i class="bi bi-heart-fill text-danger"></i> by Djoelyo Andreas
        </div>
      </div>
    </div>
    <div class="not-support position-absolute start-0 end-0 top-0 bottom-0 d-none">
      <div class="position-absolute start-0 end-0 top-0 bottom-0 bg-white d-flex align-items-center justify-content-center">
        <div class="position-relative">
          <div align="center">
            <img src="Sprites/Tiles/Default/block_exclamation_active.png">
          </div>
          <div class="fs-1 mt-3" align="center">
            Your Device Not Support
          </div>
          <div class="mt-1 fs-4" align="center">
            Open this game on your PC/Laptop
          </div>
        </div>
      </div>
    </div>
    
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js?v=<?= date('YmdHis') ?>"></script>
    <script>
      var HOST = '<?= $_SERVER['HTTP_HOST'] ?>';
    </script>
    <script src="js/script.js?v=<?= date('YmdHis') ?>"></script>
    <script src="js/keyboard_controller.js?v=<?= date('YmdHis') ?>"></script>
    <script src="js/websocket_message.js?v=<?= date('YmdHis') ?>"></script>
  </body>
</html>