import { useAuth0 } from '@auth0/auth0-react'
import { protectedRequest, publicRequest } from '../../services/request.service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { getAccessTokenSilently, loginWithPopup, isLoading } = useAuth0();
    const Navigate = useNavigate()

    const login = async () => {
        await loginWithPopup()
        if (isLoading) return <h1>Loading...</h1>

        Navigate("/home")
        // Navigate(USER + /wevwe)
    }
    return (
        <>
            <button onClick={login}>Login</button>
            <button onClick={() => publicRequest()}>Public Request</button>
            <button onClick={() => protectedRequest(getAccessTokenSilently)}>Protected Request</button>
        </>

    )
}

export default Login