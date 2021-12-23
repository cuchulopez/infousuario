param (
    [string]$usuario,
    [string]$server,
    [string]$ouSearch

)
$mensajeError = [PSCustomObject]@{
                codigo = '1'
                mensaje = 'Usuario no encontrado.'
            }

try {
    $infoUser_aux = Get-ADUser -Server $server -SearchBase $ouSearch -Filter 'sAMAccountName -like $usuario'  -Properties * | 
                    Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired 
    
    if ( $infoUser_aux ) {
        $infoUser = $infoUser_aux
    } else {
        $infoUser = $mensajeError
    }
}
catch {
    $infoUser = $mensajeError
}
return $infoUser | ConvertTo-Json