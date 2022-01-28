param (
    [string]$usuario,
    [string]$server,
    [array]$ouSearch,
    [string]$user,
    [string]$pass,
    [string]$exchange
)

# function MailboxStats {
#     param (
#         [string]$userMailbox
#     )
    
#     $session = New-PSSession -Name Exchange -ConfigurationName Microsoft.Exchange -ConnectionUri http://minagro-exch01.magyp.ar/powershell
#     Import-PSSession -Session $session -CommandName Get-MailboxStatistics

#     $userMailboxStats = Get-MailboxStatistics -identity $userMailbox | Format-List TotalItemSize, DatabaseName, ServerName, DatabaseProhibitSendQuota
    
#     Remove-PSSession -Session $session

#     return $userMailboxStats
# }

$mensajeError = [PSCustomObject]@{
                codigo = 1
                ObjectClass = 'Not found'
                mensaje = 'Usuario no encontrado.'
            }
$OUs = $ouSearch.Split(';')

try {
    $secpasswd = ConvertTo-SecureString "$pass" -AsPlainText -Force
    $creds = New-Object System.Management.Automation.PSCredential ($user, $secpasswd)

    $session = New-PSSession -Credential $creds -Name Exchange -ConfigurationName Microsoft.Exchange -ConnectionUri $exchange
    $cmdletExch = Import-PSSession -Session $session -CommandName Get-MailboxStatistics -DisableNameChecking
    $cmdletAD = Import-Module activedirectory -cmdlet Get-ADUser

    $infoUser_aux = Foreach($OU in $OUs){
        Get-ADUser -Server $server -Credential $creds -SearchBase $OU -Filter 'sAMAccountName -like $usuario'  -Properties * | 
        Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired
    }
    
    # $infoUser_aux = Get-ADUser -Server $server -Credential $creds -SearchBase $ouSearch -Filter 'sAMAccountName -like $usuario'  -Properties * | 
    #                 Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired
    
    if ( $infoUser_aux ) {
        $userMailboxStats = Get-MailboxStatistics -identity $usuario | Select-Object TotalItemSize, DatabaseName, ServerName, DatabaseProhibitSendQuota

        $infoUser = New-Object -TypeName PSObject -Property @{
            Enabled = $infoUser_aux.Enabled
            ObjectClass = $infoUser_aux.ObjectClass
            CN = $infoUser_aux.CN
            CanonicalName = $infoUser_aux.CanonicalName
            Description = $infoUser_aux.Description
            Department = $infoUser_aux.Department
            EmployeeID = $infoUser_aux.EmployeeID
            EmailAddress = $infoUser_aux.EmailAddress
            Title = $infoUser_aux.Title
            PasswordLastSet = $infoUser_aux.PasswordLastSet
            PasswordExpired = $infoUser_aux.PasswordExpired
            TotalMailboxSize = $userMailboxStats.TotalItemSize
            MailboxDatabaseName = $userMailboxStats.DatabaseName
            MailboxServerName = $userMailboxStats.ServerName
            # MailboxMaxSize = $userMailboxStats.DatabaseProhibitSendQuota.Value.ToString()
        }
        
    } else {
        $infoUser = $mensajeError
    }
}
catch {
    $infoUser = $mensajeError
}
Remove-PSSession -Session $session
return $infoUser | ConvertTo-Json