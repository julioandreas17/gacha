<table class="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100" style="border-spacing: 0px;">
  <tbody>
    <?php for ($y = 1; $y <= 15; $y ++){ ?>
      <tr>
        <?php for ($x = 1; $x <= 25; $x ++){ ?>
          <?php 
            $class = '';
            $style = '';

            if ($y == '15'){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top.png);background-size: 100% 100%;';
            }

            if ($y == '4' && $x == '10'){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top_left.png);background-size: 100% 100%;';
            }

            if ($y == '4' && $x == '17'){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top_right.png);background-size: 100% 100%;';
            }

            if ($y == '4' && ($x >= 11 && $x <= 16)){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top.png);background-size: 100% 100%;';
            }

            if (($y >= 5 && $y <= 14) && $x == 10){
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_left.png);background-size: 100% 100%;';
            }

            if (($y >= 5 && $y <= 14) && $x == 17){
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_right.png);background-size: 100% 100%;';
            }

            if (($y >= 5 && $y <= 14) && ($x >= 11 && $x <= 16)){
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_center.png);background-size: 100% 100%;';
            }
          ?>
          <td class="<?= $class ?>" style="<?= $style ?>">&nbsp;</td>
        <?php } ?>
      </tr>
    <?php } ?>
  </tbody>
</table>

<table class="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100" style="border-spacing: 0px;">
  <tbody>
    <?php for ($y = 1; $y <= 15; $y ++){ ?>
      <tr>
        <?php for ($x = 1; $x <= 25; $x ++){ ?>
          <?php 
            $class = '';
            $style = '';

            if ($y == 10 && $x == 3){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top_left.png);background-size: 100% 100%;';
            }

            if ($y == 10 && $x == 10){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top_right.png);background-size: 100% 100%;';
            }

            if ($y == 10 && ($x >= 4 && $x <= 9)){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_top.png);background-size: 100% 100%;';
            }

            if (($y >= 11 && $y <= 14) && $x == 3){
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_left.png);background-size: 100% 100%;';
            }

            if (($y >= 11 && $y <= 14) && $x == 10){
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_right.png);background-size: 100% 100%;';
            }

            if (($y >= 11 && $y <= 14) && ($x >= 4 && $x <= 9)){
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_block_center.png);background-size: 100% 100%;';
            }

            if (($y >= 13 && $y <= 14) && $x == 22){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_vertical_middle.png);background-size: 100% 100%;';
            }

            if ($y == 12 && $x == 20){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_bottom_left.png);background-size: 100% 100%;';
            }

            if ($y == 12 && $x == 24){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_bottom_right.png);background-size: 100% 100%;';
            }

            if ($y == 12 && $x == 22){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_center.png);background-size: 100% 100%;';
            }

            if (($y == 12 && $x == 21) || ($y == 12 && $x == 23)){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_bottom.png);background-size: 100% 100%;';
            }

            if (($y >= 9 && $y <= 11) && $x == 20){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_left.png);background-size: 100% 100%;';
            }

            if (($y >= 9 && $y <= 11) && $x == 24){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_right.png);background-size: 100% 100%;';
            }

            if (($y >= 9 && $y <= 11) && ($x >= 21 && $x <= 23)){
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_center.png);background-size: 100% 100%;';
            }

            if ($y == 8 && $x == 20){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_top_left.png);background-size: 100% 100%;';
            }

            if ($y == 8 && $x == 24){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_top_right.png);background-size: 100% 100%;';
            }

            if ($y == 8 && ($x >= 21 && $x <= 23)){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_stone_block_top.png);background-size: 100% 100%;';
            }

            if ($y == 7 && $x == 22){
              $class = 'touch';
              $style = 'background: url(Sprites/Tiles/Default/switch_blue.png);background-size: 100% 100%;';
            }
          ?>
          <td class="<?= $class ?>" style="<?= $style ?>">&nbsp;</td>
        <?php } ?>
      </tr>
    <?php } ?>
  </tbody>
</table>

<table class="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100" style="border-spacing: 0px;">
  <tbody>
    <?php for ($y = 1; $y <= 15; $y ++){ ?>
      <tr>
        <?php for ($x = 1; $x <= 25; $x ++){ ?>
          <?php 
            $class = '';
            $style = '';

            if ($y == 12 && $x == 2){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_cloud_left.png);background-size: 100% 100%;';
            }

            if ($y == 12 && $x == 7){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_cloud_right.png);background-size: 100% 100%;';
            }

            if ($y == 12 && ($x >= 3 && $x <= 6)){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_grass_cloud_middle.png);background-size: 100% 100%;';
            }

            if ($y == 7 && $x == 5){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_purple_cloud_left.png);background-size: 100% 100%;';
            }

            if ($y == 7 && $x == 10){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_purple_cloud_right.png);background-size: 100% 100%;';
            }

            if ($y == 7 && ($x >= 6 && $x <= 9)){
              $class = 'obstacle';
              $style = 'background: url(Sprites/Tiles/Default/terrain_purple_cloud_middle.png);background-size: 100% 100%;';
            }

            if (($y == 14 && $x == 21) || ($y == 14 && $x == 23)){
              $style = 'background: url(Sprites/Tiles/Default/grass.png);background-size: 100% 100%;';
            }

            if ($y == 3 && $x == 11){
              $style = 'background: url(Sprites/Tiles/Default/cactus.png);background-size: 100% 100%;';
            }

            if ($y == 9 && $x == 4){
              $style = 'background: url(Sprites/Tiles/Default/sign.png);background-size: 100% 100%;';
            }
          ?>
          <td class="<?= $class ?>" style="<?= $style ?>">&nbsp;</td>
        <?php } ?>
      </tr>
    <?php } ?>
  </tbody>
</table>