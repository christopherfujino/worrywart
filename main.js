$(function () {
  var templateState = {
    title: 'Worrywart',
    version: [0, 1, 0]
  };

  var db = new PouchDB('worrywart');
  var state = db.get('state').catch(function (err) {
    if (err.name === 'not_found') {
      console.log('no stored db found, creating new.');
      return templateState;
    } else throw err;
  }).then(function (state) {
    return state;
  }).catch(function (err) {
    throw err;
  });

  var stressors = [];

  var intensityArr = [
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

  var incidents = [];

  var navInterface = new Vue({
    el: '#nav-interface',
    data: {
      title: state.title,
      version: '' + state.version[0] + '.' + state.version[1] + '.' + state.version[2]
    },
    methods: {
      navRouter: function (target, e) {
        $('#menu-collapse li').removeClass('active');
        $(e.srcElement).parent().addClass('active');
        router(target);
      }
    }
  });

  var incidentInterface = new Vue({
    el: '#incident-interface',
    data: {
      stressors: stressors,
      intensity: intensityArr,
      newStressor: '',
      incident: { type: '', intensity: '', date: null }
    },
    methods: {
      buttonRouter: function (stressor) {
        this.incident.date = new Date();
        this.incident.type = stressor;
        router('#stress-level');
      },
      intensityRouter: function (e) {
        this.incident.intensity = parseInt(e.srcElement.innerText, 10);
        router('#result');
      },
      cancel: function (e) {
        this.incident.type = '';
        this.incident.intensity = '';
        this.incident.date = null;
        router('#button-interface');
      },
      log: function (e) {
        incidents.push($.extend({}, this.incident));// shallow clone
        this.incident.type = '';
        this.incident.intensity = '';
        this.incident.date = null;
        router('#button-interface');
      },
      addNewStressor: function () {
        this.stressors.push(this.newStressor);
        this.newStressor = '';
      }
    }
  });

  var statsModal = new Vue({
    el: '#stats-modal',
    data: {
      incidents: incidents
    },
    methods: {
      hours: function (i) {
        var x = i.date.getHours();
        if (x < 10) x = '0' + x;
        return '' + x;
      },
      minutes: function (i) {
        var x = i.date.getMinutes();
        if (x < 10) x = '0' + x;
        return '' + x;
      },
      okay: function () {
        $('#stats-modal .modal-body .nav-tabs a:first').tab('show');
        $('#stats-modal').modal('hide');
      }
    }
  });

  var settingsModal = new Vue({
    el: '#settings-modal',
    methods: {
      save: function (e) {
        $('#settings-modal').modal('hide');
      }
    }
  });

  var aboutModal = new Vue({
    el: '#about-modal',
    data: {
      title: state.title,
      version: '' + state.version[0] + '.' + state.version[1] + '.' + state.version[2]
    }
  })
});
