var path = require('path');
 
var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'infoUsuarioAPI',
  description: 'Backend de aplicacion infoUsuario',
  script:  path.resolve('./bin/www'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();
