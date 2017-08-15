(function() {
  'use strict';

  angular
    .module('vs.projects', [])
    .controller('ProjectsController', [ProjectsController]);

  console.debug('Initiating Module...');

  function ProjectsController($s) {
    console.debug('ProjectsController: Loaded');

    var vm = this;
    vm.projects = [
      {
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        groupSizeMin: 0,
        groupSizeMax: 0,
        skills: [{}],
        expense: 0,
        notes: ''
      }
    ];
  }
});
