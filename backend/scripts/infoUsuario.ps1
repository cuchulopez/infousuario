param (
    [string]$usuario
)
$mensajeError = [PSCustomObject]@{
                codigo= '0'
                mensaje= 'No existe'
            }

try {
    $infoUser = Get-ADUser -Identity $usuario -Properties * | 
                    Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired 
    
    return $infoUser | ConvertTo-Json
                    
}
catch {
    return ( $mensajeError | ConvertTo-Json )
    
}