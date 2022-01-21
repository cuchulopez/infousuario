import React, { useState } from 'react';

import { User } from './components/usuarios/User';
import SearchUser from './components/search/SearchUser';

function InfoUsuariosApp({defaultUsuario = ''}) {
  const [usuario, setUsuario] = useState(defaultUsuario);
  
  return (
    <>
      <User setUsuario = { setUsuario }/>

      <SearchUser 
        usuario = { usuario }
      />
       
    </>
  );
}

export default InfoUsuariosApp;
