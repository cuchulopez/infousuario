// import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { InfoUser } from '../usuarios/InfoUser';
// import { getUser } from '../../functions/getUser';

import '../../styles/searchUser.css';
import { useInfoUsuario } from '../../hooks/useInfoUsuario';

const SearchUser = ({ usuario }) => {
    
    const { cargando , datos } = useInfoUsuario( usuario );
    const infoUser = !!datos && datos; // condicional para q no tire error por null al cargar el componente

    return (
        <div className="usuario">
            
            {
                (cargando && usuario !== '' ) && (
                    <div>
                        Buscando...
                    </div>
                ) 
            }

            {/* {
                !cargando && <h4>Usuario: { infoUser.AccountName }</h4>
            } */}

            { infoUser.Code !== 0 && <span> {infoUser.Message} </span> }
            
            {
                ( !cargando && infoUser.Code === 0 ) && 
                             <InfoUser infoUsuario = { infoUser } />
            }
        </div>
    )
}

SearchUser.propTypes = {
    usuario: PropTypes.string.isRequired
}

export default SearchUser;
