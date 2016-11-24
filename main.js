$(function () {
  //interface();

  var stressors = [
    'The economy',
    'Politics',
    'Dramaz'
  ];

  var intensityArr = [
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

  var navInterface = new Vue({
    el: '#nav-interface',
    methods: {
      navRouter: function (target, e) {
        $('#menu-collapse li').removeClass('active');
        $(e.srcElement).parent().addClass('active');
        router(target);
      }
    }
  })

  var incidentInterface = new Vue({
    el: '#incident-interface',
    data: {
      stressors: stressors,
      intensity: intensityArr,
      incident: { type: '', intensity: '' }
    },
    methods: {
      buttonRouter: function (e) {
        this.incident.type = e.srcElement.innerText;
        router('#stress-level');
      },
      intensityRouter: function (e) {
        this.incident.intensity = parseInt(e.srcElement.innerText, 10);
        router('#result');
      }
    }
  });
/*
  var stressLevel = new Vue({
    el: '#stress-level',
    data: {
      intensity: intensity
    },
    methods: {
      thisRouter: function (e) {
        thisIncident.intensity = parseInt(e.srcElement.innerText, 10)
        router('#result');
        console.log({thisIncident});
      }
    }
  });

  var result = new Vue({
    el: '#result',
    data: {
      incident: thisIncident
    },
    methods: {
      type: function () { return thisIncident.type; }
    }
  });
  */
});
