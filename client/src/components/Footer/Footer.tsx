import { NavLink } from 'react-router-dom'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

import "./Footer.styles.css"

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="centered-content">
                <div className="icon-container">
                    <NavLink to="https://www.linkedin.com/in/ivanlomoro/" target="_blank">
                        <FaLinkedin className="social-icon" />
                    </NavLink>
                </div>
                <div className="icon-container">
                    <NavLink to="https://github.com/ivanlomoro" target="_blank">
                        <FaGithub className="social-icon" />
                    </NavLink>
                </div>
                <div className="icon-container">
                    <NavLink to="https://assemblerinstitute.com/" target="_blank">
                        <img src="./src/assets/imgs/aiticono.jpg" alt="ait-icon" className='ait-icon'/>
                    </NavLink>
                </div>
            </div>
            <div className="centered-content">
                <p className="copyright-text">© 2023 MovieHat by Iván Martín Lomoro at AIT</p>
            </div>
        </footer>
    )
}

export default Footer