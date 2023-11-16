import { useAuth0 } from '@auth0/auth0-react'
import { protectedRequest, publicRequest } from '../../services/request.service';

const Login = () => {
    const { getAccessTokenSilently,loginWithRedirect } = useAuth0();

    return (
        <>
            <button onClick={() => loginWithRedirect()}>Login</button>
            <button onClick={() => publicRequest()}>Public Request</button>
            <button onClick={() => protectedRequest (getAccessTokenSilently)}>Protected Request</button>
        </>

    )
}

export default Login