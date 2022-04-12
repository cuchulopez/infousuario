import React from 'react';
import PropTypes from 'prop-types';

import { InfoUserItem } from './InfoUserItem';
import Accordion from 'react-bootstrap/Accordion';

import '../../styles/infoUser.css';

export const InfoUserList = ({ infoUsuario }) => {
    
    
    return ( 
            <Accordion className='infouser' flush>
                
                {   
                    infoUsuario.map(( user, i ) => (

                        <Accordion.Item key = { user.EmployeeID } eventKey =  { i }  >
                            <Accordion.Header>
                                Usuario: { user.AccountName }
                            </Accordion.Header>
                            <Accordion.Body>
                                 <InfoUserItem user = { user } />
                            </Accordion.Body>
                        </Accordion.Item>
                        
                    ))
                        
                }

            </Accordion>
    )
}

InfoUserList.propTypes = {
    infoUsuario: PropTypes.array.isRequired
}