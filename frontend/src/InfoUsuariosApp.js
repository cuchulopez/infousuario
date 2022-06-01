import React, { useState } from 'react';

import { User } from './components/usuarios/User';
import SearchUser from './components/search/SearchUser';

import 'bootstrap/dist/css/bootstrap.min.css';

function InfoUsuariosApp({defaultUsuario = ''}) {

  const initialUser = {
    user: '',
    error: true
  }
  const [usuario, setUsuario] = useState('');
  
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
