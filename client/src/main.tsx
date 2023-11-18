import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/main.css'
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react'
import { MovieProvider } from './context/MovieContext.tsx';

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env
const redirect_Uri = window.location.origin + '/home';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirect_Uri,
                audience: audience
            }}>
            <MovieProvider>
                <App />
            </MovieProvider>
        </Auth0Provider>
    </BrowserRouter>
)
