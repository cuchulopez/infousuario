// import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { useInfoUsuario } from '../../hooks/useInfoUsuario';
import { InfoUserList } from '../usuarios/InfoUserList';

import '../../styles/searchUser.css';

const SearchUser = ({ usuario }) => {
    
    const [ cargando , datos ] = useInfoUsuario( usuario );
    const infoUser = !!datos && datos; // condicional para q no tire error por null al cargar el componente, !!null = false
    return (
        <div className="usuario">
            
            {
                (cargando && usuario !== '' ) && (
                    <div>
                        Buscando...
                    </div>
                ) 
            }

            {
                infoUser !== false && (
                    infoUser[0].Code !== 0 && <span> { infoUser[0].Message } </span> 
                )
            }
            
            {
                ( !cargando && infoUser !== false) && (
                    infoUser[0].Code === 0  && 
                             <InfoUserList infoUsuario = { infoUser } />
                    )
            }
        </div>
    )
}

SearchUser.propTypes = {
    usuario: PropTypes.string.isRequired
}

export default SearchUser;
