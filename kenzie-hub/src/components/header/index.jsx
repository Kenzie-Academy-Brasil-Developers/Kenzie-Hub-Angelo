import { Link } from "react-router-dom";

function Header() {
    return (
        <header id="register-header">
            <h1> Kenzie Hub </h1> 

            <Link id="return-anchor" to="/">
                <button id="return-btn">Voltar</button>
            </Link>
        </header>
    )
}
export default Header