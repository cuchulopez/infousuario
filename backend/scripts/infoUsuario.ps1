param (
    [string]$usuario,
    [string]$server,
    [array]$ouSearch,
    [string]$user,
    [string]$pass
)
$mensajeError = [PSCustomObject]@{
                codigo = '1'
                mensaje = 'Usuario no encontrado.'
            }
$OUs = $ouSearch.Split(';')

try {
    
    $secpasswd = ConvertTo-SecureString "$pass" -AsPlainText -Force
    $creds = New-Object System.Management.Automation.PSCredential ($user, $secpasswd)
    $infoUser_aux = Foreach($OU in $OUs){
                        Get-ADUser -Server $server -Credential $creds -SearchBase $OU -Filter 'sAMAccountName -like $usuario'  -Properties * | 
                            Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired
    }
    
    # $infoUser_aux = Get-ADUser -Server $server -Credential $creds -SearchBase $ouSearch -Filter 'sAMAccountName -like $usuario'  -Properties * | 
    #                 Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired
    
    if ( $infoUser_aux ) {
        $infoUser =  $infoUser_aux
    } else {
        $infoUser = $mensajeError
    }
}
catch {
    $infoUser = $mensajeError
}
return $infoUser | ConvertTo-Json