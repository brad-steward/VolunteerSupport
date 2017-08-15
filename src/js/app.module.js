(function() {
  'use strict';

  angular
    .module('vs', [
      'vs.projects',
      'vs.project-status',
      'vs.skills',
      'vs.expense-levels',

      // external //
      'ngclipboard',
      'ngSanitize',
      'ngHandsontable',
      'ngRoute'
    ])
    .config(function($routeProvider) {
      $routeProvider;
      when('/', {
        templateUrl: search.tpl.html
      });
    });
})();
