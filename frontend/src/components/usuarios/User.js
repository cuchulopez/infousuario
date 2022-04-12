import React, {useState} from 'react';
import PropTypes from 'prop-types';

import '../../styles/user.css'
import { ShowButton } from './ShowButton';

export const User = ({ setUsuario }) => {

    
    const [user, setUser] = useState('');

    // const handleCleanup = () => {
    //     setUser('');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsuario( user );
    };

    const handleInputChange = ( {target} ) =>  {
        setUser(target.value);
    };

    return (
        <div className="infoUsuario">
            <h3>Información de usuario MAGyP</h3>
            <div className="col-8">
                <form className="row" onSubmit= {handleSubmit}>
                    <div className="col-4">
                        <input 
                            autoComplete= "off"
                            className="form-control"
                            name = "userSearch"
                            // onClick = { handleCleanup }
                            onChange = { handleInputChange }
                            placeholder='Ingrese un usuario o DNI.'
                            type="text" 
                            value = { user }
                        />
                    </div>
                    <ShowButton />
                </form>
            </div>
        </div>
    )
}

User.propTypes = {
    setUsuario: PropTypes.func.isRequired
}