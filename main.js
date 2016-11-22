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
    },
    {
      intensity: 8,
      description: null
    },
    {
      intensity: 7,
      description: null
    },
    {
      intensity: 6,
      description: null
    },
    {
      intensity: 5,
      description: null
    },
    {
      intensity: 4,
      description: null
    },
    {
      intensity: 3,
      description: null
    },
    {
      intensity: 2,
      description: null
    },
    {
      intensity: 1,
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
