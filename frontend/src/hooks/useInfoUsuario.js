import { useEffect, useState } from 'react';
import { getUser } from '../functions/getUser';

export const useInfoUsuario = ( usuario ) => {
    const initialState = {datos: null, cargando: true};
    const [infoUsuario, setInfoUsuario] = useState( initialState );

    useEffect(() => {

        setInfoUsuario( {datos: null, cargando: true} );

        if (usuario !== ''){
            getUser( usuario )
                .then( datos => {
                    setInfoUsuario({
                        cargando: false,
                        datos
                    })
                });
        }
    }, [usuario]);

    return infoUsuario;

}
