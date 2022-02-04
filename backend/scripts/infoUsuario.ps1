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

[Int32]$DNI = $null
$Mensajes = @([PSCustomObject]@{
                    Code = 1
                    ObjectClass = 'Not found'
                    Message = 'Usuario no encontrado.'
                },
                [PSCustomObject]@{
                    Code = 2
                    ObjectClass = 'Not found'
                    Message = 'DNI no encontrado.'
                }
            )
$OUs = $ouSearch.Split(';')

try {
    $secpasswd = ConvertTo-SecureString "$pass" -AsPlainText -Force
    $creds = New-Object System.Management.Automation.PSCredential ($user, $secpasswd)

    $session = New-PSSession -Credential $creds -Name Exchange -ConfigurationName Microsoft.Exchange -ConnectionUri $exchange
    $cmdletExch = Import-PSSession -Session $session -CommandName Get-MailboxStatistics -DisableNameChecking
    $cmdletAD = Import-Module activedirectory -cmdlet Get-ADUser

    if ([Int32]::TryParse($usuario,[ref]$DNI)){
        $tipoDato = "employeeID"
        $mensajeError = $Mensajes[1]
        # $filtro = 'employeeID -like $DNI'
    } else {
        $tipoDato = "sAMAccountName"
        $mensajeError = $Mensajes[0]
    }
    $filtro = '$tipoDato -like $usuario'

    $infoUser_aux = Foreach($OU in $OUs){
        Get-ADUser -Server $server -Credential $creds -SearchBase $OU -Filter $filtro -Properties * | 
        Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired, SamAccountName 
    }
    # $infoUser_aux = Get-ADUser -Server $server -Credential $creds -SearchBase $ouSearch -Filter 'sAMAccountName -like $usuario'  -Properties * | 
    #                 Select-Object Enabled,ObjectClass,CN,CanonicalName,Description,Department,EmployeeID,EmailAddress,Title,@{Name="PasswordLastSet";Expression={Get-Date ($_.'PasswordLastSet') -Format 'dd/MM/yyyy HH:mm'}},PasswordExpired
    
    if ( $infoUser_aux ) {
        $userMailboxStats = Get-MailboxStatistics -identity $infoUser_aux.SamAccountName | Select-Object TotalItemSize, DatabaseName, ServerName, DatabaseProhibitSendQuota

        $infoUser = New-Object -TypeName PSObject -Property @{
            Code = 0
            Enabled = $infoUser_aux.Enabled
            ObjectClass = $infoUser_aux.ObjectClass
            AccountName = $infoUser_aux.SamAccountName
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
            TipoDato = $tipoDato
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