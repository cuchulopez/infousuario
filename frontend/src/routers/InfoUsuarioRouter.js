import { Routes, Route, BrowserRouter } from 'react-router-dom';
import InfoUsuariosApp from '../InfoUsuariosApp';

export const InfoUsuarioRouter = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                
                <Route path="/*" element={ <InfoUsuariosApp />  } />

            </Routes>
        </BrowserRouter>
    )
}