import { Link } from "react-router-dom"
import "./Header.styles.css"
import { FiLogOut } from 'react-icons/fi'

export function Header() {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="./src/assets/imgs/moviehatlogo.png" className="img-icon" alt="Icono" />
                </Link>
                <div className="cart">
                    <span className="user-info">
                        Welcome back!
                    </span>
                    <div className="user-icon">
                        <img src="./src/assets/imgs/moviehatlogo.png" alt="Icon" />
                    </div>

                    <button style={{ width: "3rem", height: "3rem", position: "relative", border: "none", backgroundColor: "transparent" }} onClick={() => {
                    }} >
                        <FiLogOut className="logout-icon" />
                    </button>
                </div>
            </div>
        </header>
    )
}