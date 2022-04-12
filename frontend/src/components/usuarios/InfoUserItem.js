import React from 'react'

export const InfoUserItem = ( { user } ) => {
 
    // console.log('List1: ', infoUsuario);
    return (
            
            <table className='table'>
                <tbody>
                    <tr>
                        <th scope='row' >Estado: </th>
                        { user.Enabled ? <td>Habilitado </td> : <td>Deshabilitado</td>} 
                    </tr>
                    <tr>
                        <th scope ='row'>Estado de constraseña:</th>
                        { user.PasswordExpired ? <td>Expirada</td> : <td>Ok</td> } 
                    </tr>
                    <tr>
                        <th scope='row'>Último cambio de constraseña:</th>
                        <td>{ user.PasswordLastSet }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Nombre completo:</th>
                        <td>{ user.CN } </td>
                    </tr>
                    <tr>
                        <th scope='row'>Ubicación:</th>
                        <td>{ user.CanonicalName } </td>
                    </tr>
                    <tr>
                        <th scope='row'>Descripción:</th>
                        <td>{ user.Description }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Departamento:</th>
                        <td>{ user.Department }</td>
                    </tr>
                    <tr>
                        <th scope='row'>DNI:</th>
                        <td>{ user.EmployeeID }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Puesto:</th>
                        <td>{user.Title }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Email:</th>
                        <td>{ user.EmailAddress }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Cuota de correo usada:</th>
                        <td>{ user.TotalMailboxSize }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Base de datos de correo:</th>
                        <td>{ user.MailboxDatabaseName }</td>
                    </tr>
                    <tr>
                        <th scope='row'>Servidor de correo:</th>
                        <td>{ user.MailboxServerName }</td>
                    </tr>
                </tbody>
            </table>
    )
}
