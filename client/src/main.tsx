import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env
const redirect_Uri = window.location.origin;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirect_Uri,
                audience: audience
            }}>
            <App />
        </Auth0Provider>
    </BrowserRouter>
)
