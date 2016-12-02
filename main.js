function Worrywart () {
  this._id = 'state';
  this.title = 'Worrywart';
  this.dbName = 'worrywart';
  this.documentName = 'state';
  this.version = [0, 3, 0];
  this.stressors = [];
  this.incidents = [];
}

var templateState = new Worrywart();

var db = new PouchDB(templateState.dbName);

function compareVersion (first, second, failCallback) {
  for (var i = 0; i<3; i++) {
    if (first[i] !== second[i]) {
      if (first[i] > second[i]) return failCallback(1);
      else return failCallback(-1);
    }
  }
  return true;
}

db.get(templateState.documentName).catch(function (err) {
  if (err.name === 'not_found') {
    console.log('no stored db found, creating new.');
    return templateState;
  } else throw err;
}).then(function (state) {
  'use strict';

  compareVersion(new Worrywart().version, state.version, function (diff) {
    state.version = new Worrywart().version;
    console.log('changed state version to ' + state.version);
    // should save here
  });

  if(state._rev) console.log('Loaded _rev ' + state._rev);

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

  var navInterface = new Vue({
    el: '#nav-interface',
    data: {
      title: state.title,
      version: '' + state.version[0] + '.' + state.version[1] + '.' + state.version[2]
    },
    methods: {
      save: function () { // deprecated
        db.put(state)
          .then(function (response) {
            state._rev = response.rev;
            console.log('saved state. new _rev is: ' + state._rev);
          }).catch(function (err) { throw err; });
      },
      reset: function () {
        if (state._rev) {
          console.log('current _rev: ' + state._rev);
          db.remove(state)
            .then(function () {
              console.log('deleted state.');
              state = new Worrywart();
              console.log('created new state.');
            }).catch(function (err) { throw err; });
        } else {
          console.error('State has no _rev property.');
        }
      },
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
      stressors: state.stressors,
      intensity: intensityArr,
      newStressor: '',
      incident: {
        type: '',
        intensity: '',
        date: null,
        localeString: '',
        description: '' }
    },
    methods: {
      buttonRouter: function (stressor) {
        var date = new Date();
        this.incident.date = date.getTime();
        this.incident.localeString = date.toLocaleString();
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
        this.incident.localeString = '';
        this.incident.description = '';
        router('#button-interface');
      },
      log: function (e) {
        state.incidents.push($.extend({}, this.incident));// shallow clone
        this.incident.type = '';
        this.incident.intensity = '';
        this.incident.date = null;
        this.incident.localeString = '';
        this.incident.description = '';
        db.put(state)
          .then(function (response) {
            state._rev = response.rev;
            console.log('saved state. new _rev is: ' + state._rev);
          }).catch(function (err) { throw err; });
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
      incidents: state.incidents
    },
    methods: {
      hours: function (i) {
        var x = new Date(i.date).getHours();
        if (x < 10) x = '0' + x;
        else x += '';
        return x;
      },
      minutes: function (i) {
        var x = new Date(i.date).getMinutes();
        if (x < 10) x = '0' + x;
        else x += '';
        return x;
      },
      month: function (i) {
        return new Date(i.date).getMonth() + 1;
      },
      date: function (i) {
        return new Date(i.date).getDate();
      },
      year: function (i) {
        return new Date(i.date).getFullYear();
      },
      okay: function () {
        $('#stats-modal .modal-body .nav-tabs a:first').tab('show');
        $('#stats-modal').modal('hide');
      }
    }
  });

  var preferencesModal = new Vue({
    el: '#preferences-modal',
    methods: {
      save: function (e) {
        $('#preferences-modal').modal('hide');
      }
    }
  });

  var aboutModal = new Vue({
    el: '#about-modal',
    data: {
      title: state.title,
      version: '' + state.version[0] + '.' + state.version[1] + '.' + state.version[2]
    }
  });

}).catch(function (err) {
  throw err;
});
