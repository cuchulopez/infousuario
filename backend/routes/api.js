var express = require('express');
var router = express.Router();
const { PowerShell } = require('node-powershell');

router.get('/infoUsuario/:usuario', async function(req, res, next) {
    let usuario = req.params.usuario;
    let ps = new PowerShell({
      executionPolicy: 'Bypass',
      noProfile: true
    });
    // const printCommand = PowerShell.command`Get-ADUser -Identity ${usuario} -Properties * | Select Enabled,ObjectClass,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={[datetime]::FromFileTime($_.'PasswordLastSet')}} | ConvertTo-Json`;
    const printCommand = PowerShell.command`. ./../scripts/infoUsuario.ps1 ${usuario}`;
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