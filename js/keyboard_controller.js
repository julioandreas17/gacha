window.addEventListener('keydown', function (event){
  control[event.code] = true;
});

window.addEventListener('keyup', function (event){
  control[event.code] = false;
});