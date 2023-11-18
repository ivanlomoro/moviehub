import { Link } from "react-router-dom"
import "./Header.styles.css"
import { FiLogOut } from 'react-icons/fi'
import { useAuth0, LogoutOptions } from '@auth0/auth0-react'

export function Header() {

    const { user, logout } = useAuth0()

    return (
        <header>
            <div className="container">
                <Link to="/home">
                    <img src="./src/assets/imgs/moviehatlogo.png" className="img-icon" alt="Icono" />
                </Link>
                <div className="cart">
                    <span className="user-info">
                        Welcome back {user?.name} !
                    </span>
                    <div className="user-icon">
                        <img src={user?.picture} alt={user?.name} />
                    </div>

                    <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }}
                        onClick={() => logout({ returnTo: window.location.origin } as LogoutOptions)} >
                        <FiLogOut className="logout-icon" />
                    </button>
                </div>
            </div>
        </header>
    )
}