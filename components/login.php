<div class="login position-absolute start-0 end-0 top-0 bottom-0 d-none">
  <div class="position-absolute start-0 end-0 top-0 bottom-0 bg-dark" style="opacity: 0.5;"></div>
  <div class="position-absolute start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
    <div class="row w-100 d-flex justify-content-center">
      <div class="col-6">
        <div class="position-relative w-100 overflow-hidden p-3 bg-white shadow" style="border-radius: 10px;">
          <div class="fs-1" align="center">
            GaCha <span class="bg-success text-white py-1 px-2" style="border-radius: 10px;">App</span>
          </div>
          <div class="mt-3 mb-2">Set Username :</div>
          <input type="text" name="username" id="username" class="form-control form-control-lg" placeholder="Type here ...">
          <div class="mt-2 mb-2">Choose hero :</div>
          <div class="row w-100">
            <?php foreach(array('beige', 'green', 'pink', 'purple', 'yellow') as $hero){ ?>
            <div class="col-auto">
              <img src="Sprites/Tiles/Default/hud_player_helmet_<?= $hero ?>.png" value="<?= $hero ?>" alt="hero" class="bg-white" style="border-radius: 10px;width: 50px;height: 50px;" role="button">
            </div>
            <?php } ?>
          </div>
          <div class="button fs-1 mt-3 w-100 p-2 bg-success text-white" align="center" role="button" style="border-radius: 10px;">
            Let's Play !
          </div>
        </div>
      </div>
    </div>
  </div>
</div>