$(function () {
  var stressors = [
    'The economy',
    'Politics',
    'Dramaz'
  ];

  var intensity = [
    {
      intensity: 10,
      description: 'Complete Meltdown'
    },
    {
      intensity: 9,
      description: null
    }
  ];

  var buttonInterface = new Vue({
    el: '#button-interface',
    data: {
      stressors: stressors,
    }
  });

  var stressLevel = new Vue({
    el: '#stress-level',
    data: {
      intensity: intensity
    }
  })
})