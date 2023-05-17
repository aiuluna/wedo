define((function () { 'use strict';

  function run(context) {
      console.log('run......');
      var btn = context.select('btn');
      console.log('btn', btn);
      btn.on('click', function () {
          alert('click 点我');
      });
  }

  return run;

}));
