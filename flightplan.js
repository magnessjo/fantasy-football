
// Flightplan

"use strict";

// Dependencies

var Flightplan = require('flightplan'),
    plan       = new Flightplan(),
    tmpDir     = 'bel-air-fantasy-football-' + new Date().getTime(),
    homeDir    = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];	

// Configuration

plan.briefing({
  debug: false,
  destinations: {
    'staging': {
      host:       'belairfantasyfootball.com',
      username:   'ec2-user',
      privateKey:  homeDir + '/.ssh/id_rsa'
    }
  }
});

// Default

plan.local('default', function(local) {
  local.silent();
  local.exec('gulp build');
  var filesToCopy = local.exec('find build/ -type f -not -name "*.map"');
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

plan.remote('default', function(remote) {
  remote.silent();
  remote.exec('cp -R /tmp/' + tmpDir + '/build/*' + ' /var/www/html/bel-air-fantasy-football');
  remote.rm('-rf /tmp/' + tmpDir);
});

