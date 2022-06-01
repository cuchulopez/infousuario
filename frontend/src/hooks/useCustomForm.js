import { useState } from 'react';
import { regex } from '../helpers/consts' ;

export const useCustomForm = ( initialForm = {} ) => {
    const [ formState, setFormState ] = useState( initialForm );
    const [errorValidate, setErrorValidate] = useState(true);
    
    const validate = ( value ) => {

        if( (regex.user).test(value)){
            setErrorValidate(true);
        }else {
            setErrorValidate(false);
        } 
    }
    
    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        
        validate (value);
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    return [
        formState,
        errorValidate,
        handleInputChange
    ]
    
}

