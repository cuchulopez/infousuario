import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { ShowButton } from './ShowButton';
import { useCustomForm } from '../../hooks/useCustomForm';

import '../../styles/user.css'

export const User = ({ setUsuario }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
 
    const [ formValues, errorValidate, handleInputChange ] = useCustomForm({
        userSearch: q,
    });
    
    const [isSubmit, setisSubmit] = useState(false);
    const { userSearch } = formValues;

    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        setisSubmit(true);
        if ( errorValidate ){
            setUsuario( userSearch );
            navigate(`?q=${ userSearch }`);
        }
        
    };
    

    return (
        <div className="infoUsuario">
            <h3>Información de usuario MAGyP</h3>
            <div className="col-8 mt-4">
                <form className="row" onSubmit = { handleOnSubmit }>
                    <div className="col-4">
                        <input 
                            autoComplete= "off"
                            autoFocus 
                            className="form-control"
                            name = "userSearch"
                            onChange = { handleInputChange }
                            placeholder='Ingrese un usuario o DNI.'
                            type="text"
                            value = { userSearch }
                        />
                    </div>
                    <ShowButton />
                    { (!errorValidate && isSubmit ) && <p className = "mensaje alert alert-danger" role="alert">El usuario debe tener letras o numeros, mínimo 5 y máximo 15 caracteres.</p> }
                </form>
            </div>
        </div>
    )
}

User.propTypes = {
    setUsuario: PropTypes.func.isRequired
}