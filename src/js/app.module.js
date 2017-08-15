(function() {
  'use strict';

  angular.module('app', [
    'app.expense-levels',
    'app.project-status',
    'app.projects',
    'app.skills',
    'app.search',

    // external //
    'ngclipboard',
    'ngSanitize',
    'ngHandsontable'
  ]);
})();
