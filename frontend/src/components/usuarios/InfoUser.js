import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/infoUser.css';

export const InfoUser = ({ infoUsuario }) => {

    return ( 
                <div className='infouser'>
                
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th scope='row' >Estado: </th>
                                { infoUsuario.Enabled ? <td>Habilitado </td> : <td>Deshabilitado</td>} 
                            </tr>
                            <tr>
                                <th scope ='row'>Estado de constraseña:</th>
                                { infoUsuario.PasswordExpired ? <td>Expirada</td> : <td>Ok</td> } 
                            </tr>
                            <tr>
                                <th scope='row'>Último cambio de constraseña:</th>
                                <td>{ infoUsuario.PasswordLastSet }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Nombre completo:</th>
                                <td>{ infoUsuario.CN } </td>
                            </tr>
                            <tr>
                                <th scope='row'>Ubicación:</th>
                                <td>{ infoUsuario.CanonicalName } </td>
                            </tr>
                            <tr>
                                <th scope='row'>Descripción:</th>
                                <td>{ infoUsuario.Description }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Departamento:</th>
                                <td>{ infoUsuario.Department }</td>
                            </tr>
                            <tr>
                                <th scope='row'>DNI:</th>
                                <td>{ infoUsuario.EmployeeID }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Puesto:</th>
                                <td>{ infoUsuario.Title }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Email:</th>
                                <td>{ infoUsuario.EmailAddress }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Cuota de correo usada:</th>
                                <td>{ infoUsuario.TotalMailboxSize }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Base de datos de correo:</th>
                                <td>{ infoUsuario.MailboxDatabaseName }</td>
                            </tr>
                            <tr>
                                <th scope='row'>Servidor de correo:</th>
                                <td>{ infoUsuario.MailboxServerName }</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <ul>
                        <li> <span></span>  </li>
                        <li> <span></span>  </li>
                        <li> <span></span>  </li>
                        <li> <span></span>  </li>
                        <li> <span></span>  </li>
                        <li> <span></span>  </li>
                        <li> 
                            <span> </span>
                            
                        </li>
                    </ul>
                </div>
    )
}

InfoUser.propTypes = {
    infoUsuario: PropTypes.object.isRequired
}