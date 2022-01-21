var express = require('express');
var router = express.Router();
const { PowerShell } = require('node-powershell');

router.get('/infoUsuario/:usuario', async function(req, res, next) {
    const usuario = req.params.usuario;
    const server = process.env.DC_SERVER;
    const ouSearch = process.env.DC_OU_SEARCH;
    const user = process.env.AD_USR;
    const pass = process.env.AD_USR_PASS;
    const exchange = process.env.EXCH_URL;

    let ps = new PowerShell({
      executionPolicy: 'Bypass',
      noProfile: true
    });

    const printCommand = PowerShell.command`. ./../scripts/infoUsuario.ps1 ${usuario} ${server} ${ouSearch} ${user} ${pass} ${exchange}`;
    
    // console.log(printCommand);
    // const printCommand = PowerShell.command`Get-ADUser -Identity ${usuario} -Properties * | Select Enabled,ObjectClass,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={[datetime]::FromFileTime($_.'PasswordLastSet')}} | ConvertTo-Json`;
    await ps.invoke(printCommand)
    .then(output => {
      console.log(output.raw);
      res.json(JSON.parse(output.raw));
    })
    .catch(err => {
      console.log(err);
      ps.dispose();
    });

});
    
module.exports = router;