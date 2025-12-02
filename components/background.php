<table class="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100" style="border-spacing: 0px;">
  <tbody>
    <?php for ($y = 1; $y <= 3; $y ++){ ?>
      <tr>
        <?php for ($x = 1; $x <= 4; $x ++){ ?>
          <?php 
            $class = '';
            $style = '';

            if (in_array($y, array(1)) == true && in_array($x, array(1, 2, 3, 4)) == true){
              $class = 'cloud';
              $style = 'background: url(Sprites/Backgrounds/Double/background_clouds.png);background-size: 100% 100%;';
            }

            if (in_array($y, array(2)) == true && in_array($x, array(1, 2, 3, 4)) == true){
              if ($x % 2 == 0){
                $style = 'background: url(Sprites/Backgrounds/Double/background_fade_desert.png);background-size: 100% 100%;';
              }else{
                $style = 'background: url(Sprites/Backgrounds/Double/background_fade_trees.png);background-size: 100% 100%;';
              }
            }

            if (in_array($y, array(3)) == true && in_array($x, array(1, 2, 3, 4)) == true){
              $style = 'background: url(Sprites/Backgrounds/Double/background_solid_sky.png);background-size: 100% 100%;';
            }
          ?>
          <td class="<?= $class ?>" style="<?= $style ?>">&nbsp;</td>
        <?php } ?>
      </tr>
    <?php } ?>
  </tbody>
</table>