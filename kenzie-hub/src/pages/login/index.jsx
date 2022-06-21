import "./style.css"

import { useState } from 'react';

import axios from "axios"

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from "react-hook-form";

import { Link, Redirect } from "react-router-dom"

function Login( { baseUrl, setUser, setTechs } ) {
    const [userIsLogged, setUserIsLogged] = useState(false)

    const loginSchema = yup.object().shape({
        email: yup.string()
                  .required("Você precisa informar um email"),
        
        password: yup.string()
                     .required("Você precisa informar um senha")
    })
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const loginData = (loginData) => {
        axios.post(`${baseUrl}/sessions`, loginData)
             .then(res => {
                localStorage.setItem("@token", res.data.token)
                setUserIsLogged(true)
                setUser(res.data.user)
                setTechs(res.data.user.techs)
             })
             .catch(err => {
                setUserIsLogged(false)
             })
    }

    return (
        <div id="login-page">
            <h1> Kenzie Hub </h1>

            <div id="login-container">
                <h2> Login </h2>
                <form className="form" onSubmit={handleSubmit(loginData)}>
                    
                    <div className="input-container">
                            <input type="email"
                                   placeholder="Digite seu email"
                                   {...register("email")}
                            />
                            {errors.email?.message && 
                                <span className="error-message">
                                    {errors.email.message}
                                </span>}
                    </div>

                    <div className="input-container">
                            <input type="password"
                                   placeholder="Digite sua senha"
                                   {...register("password")}
                            />
                            {errors.password?.message && 
                                <span className="error-message">
                                    {errors.password.message}
                                </span>}
                    </div>

                    <button id="login-btn" type="submit">Entrar</button>
                </form>
            </div>

            <div id="to-register-container">
                Ainda não possui uma conta? <Link to="/register">Cadastre-se</Link>
            </div>

            {userIsLogged === true ? (
                <Redirect to="/home" />
            ) : (
                null
            )}

        </div>
    )
}

export default Login