<table class="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100" style="border-spacing: 0px;">
  <tbody>
    <?php for ($y = 1; $y <= 15; $y ++){ ?>
      <tr>
        <?php for ($x = 1; $x <= 25; $x ++){ ?>
          <?php 
            $class = '';
            if ($y == 14){
              $class = 'coin';
            }

            if ($y == 11 && ($x >= 2 && $x <= 7)){
              $class = 'coin';
            }

            if ($y == 9 && ($x >= 3 && $x <= 10)){
              $class = 'coin';
            }

            if ($y == 6 && ($x >= 5 && $x <= 10)){
              $class = 'coin';
            }

            if ($y == 3 && ($x >= 10 && $x <= 17)){
              $class = 'coin';
            }

            if ($y == 7 && ($x >= 20 && $x <= 24)){
              $class = 'coin';
            }
          ?>
          <td class="<?= $class ?>" style="background-size: 100% 100%;">&nbsp;</td>
        <?php } ?>
      </tr>
    <?php } ?>
  </tbody>
</table>