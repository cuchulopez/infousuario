import React from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

import { ShowButton } from './ShowButton';

import '../../styles/user.css'

export const User = ({ setUsuario }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerOptions = {
        required: "Ingrese usuario o DNI.",
        minLength: {
            value: 5,
            message: "Ingrese al menos 5 caracteres."
        },
        maxLength: {
            value: 15,
            message: "Máximo 15 caracteres."
        },
        pattern: {
            message: "Sólo letras o números."
        }
    };

    const onSubmit = ( { usersearch } ) => {
        setUsuario( usersearch );
    };

    return (
        <div className="infoUsuario">
            <h3>Información de usuario MAGyP</h3>
            <div className="col-8 mt-4">
                <form className="row" onSubmit = { handleSubmit(onSubmit) }>
                    <div className="col-4">
                        <input 
                            autoComplete= "off"
                            className="form-control"
                            name = "usersearch"
                            placeholder='Ingrese un usuario o DNI.'
                            type="text" 
                            {...register("usersearch", registerOptions)}
                        />
                    </div>
                    <ShowButton />
                    
                </form>
                {errors?.usersearch && <p className="col-4 alert alert-danger mt-4">{errors.usersearch.message}</p> }
            </div>
        </div>
    )
}

User.propTypes = {
    setUsuario: PropTypes.func.isRequired
}