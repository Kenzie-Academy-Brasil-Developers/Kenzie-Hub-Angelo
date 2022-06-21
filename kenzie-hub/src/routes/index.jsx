import { Switch, Route } from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import Register from "../pages/register"

function Routes( { setUser, user, techs, setTechs }) {
    const baseUrl = "https://kenziehub.herokuapp.com"
    
    return (
        <Switch>
            <Route exact path="/home">
                <Home baseUrl={baseUrl} 
                      setUser={setUser} 
                      user={user}
                      setTechs={setTechs}
                      techs={techs} />
            </Route>

            <Route exact path="/register">
                <Register baseUrl={baseUrl} />
            </Route>

            <Route exact path="/">
                <Login baseUrl={baseUrl} 
                       setUser={setUser} 
                       user={user}
                       setTechs={setTechs} />
            </Route>
        </Switch>
    )
}

export default Routes