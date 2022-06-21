import { Link } from "react-router-dom";
import "./style.css";

function Nav( { user }) {
    return (
        <header id="home-header">
            <nav id="home-nav">
                <h1> Kenzie Hub </h1> 

                <Link id="logout-anchor" to="/">
                    <button id="logout-btn"> Sair </button>
                </Link>     
            </nav>

            <div id="infos">
                <p id="profile-name">Olá, {user.name}</p>
                <p id="module"> modulo {user.course_module}</p>
            </div>
        </header>
    )
}

export default Nav