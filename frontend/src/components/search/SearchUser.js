// import React from 'react';
import PropTypes from 'prop-types';

import { useInfoUsuario } from '../../hooks/useInfoUsuario';
import { InfoUserList } from '../usuarios/InfoUserList';

import '../../styles/searchUser.css';

const SearchUser = ({ usuario = '' }) => {
    // console.log('Me ejecuté. SearchUser');

    const [ cargando , datos ] = useInfoUsuario( usuario );
    const infoUser = !!datos && datos; // condicional para q no tire error por null al cargar el componente, !!null = false
    return (
        <div className="usuario">
            
            {
                (cargando && usuario !== '' ) && (
                    <div className="spinner-border text-dark m-2" role="status">
                        <span className="visually-hidden">Buscando...</span>
                    </div>
                ) 
            }

            {
                infoUser !== false && (
                    infoUser[0].Code !== 0 && <span className='m-2'> { infoUser[0].Message } </span> 
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
