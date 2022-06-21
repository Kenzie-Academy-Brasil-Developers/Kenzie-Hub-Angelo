import "./style.css"

import { useState } from 'react';

import axios from "axios"

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from "react-hook-form";

import { Redirect } from "react-router-dom"

import  Modal  from "react-modal";

import Header from "../../components/header";

function Register( { baseUrl } ) {
    const [modal, setModal] = useState(false)
    const [successfulRegistered, setSuccessfulRegistered] = useState(undefined)
    const [courseModule, setCourseModule] = useState("Primeiro módulo (Introdução ao Frontend)")

    const registerSchema = yup.object().shape({
        name: yup.string()
                 .required("Nome é um campo obrigatório"),
        
        email: yup.string()
        .email("Não é um email válido")
        .required("Email é um campo obrigatório"),
        
        password: yup.string()
        .min(8, "A senha precisa ter mais que 8 carácteres")
        .required("Senha é um campo obrigatório"),
        
        confirmPassword: yup.string()
        .min(8, "A senha precisa ter mais que 8 carácteres")
        
        .oneOf([yup.ref("password")], "As senhas não são iguais")
        .required("Por favor, confirme sua senha"),
        
        bio: yup.string()
        .required("Fale algo sobre você"),
        
        contact: yup.string()
        .required("Deixa algum meio de contato"),
    })
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })
    
    const registerData = (registerData) => {
        registerData.course_module = courseModule
        axios.post(`${baseUrl}/users`, registerData)
        .then(res => {
            setSuccessfulRegistered(true)
        })
        .catch(err => {
            setModal(true)
            setSuccessfulRegistered(false)
        })
    }

    function handleModal () {
        if (modal === false) {
            setModal(true)
        } else {
            setModal(false)
        }
    }
    
    return (
        <div id="register-page">
            
            <div id="register-container">

                <Header />

                <div id="register-form-container">
                    <h2> 
                        Crie sua conta 
                    </h2>

                    <p> 
                        Rápido e grátis, vamos nessa 
                    </p>

                    <form id="register-form" onSubmit={handleSubmit(registerData)}>

                        <div className="input-container">
                            <input type="text"
                                placeholder="Digite aqui seu nome"
                                {...register("name")}
                            />
                            {errors.name?.message && 
                                <span className="error-message">
                                    {errors.name.message}
                                </span>}
                        </div>

                        <div className="input-container">
                            <input type="email"
                                placeholder="Digite aqui seu email"
                                {...register("email")}
                            />
                            {errors.email?.message && 
                                <span className="error-message">
                                    {errors.email.message}
                                </span>}
                        </div>

                        <div className="input-container">
                            <input type="password"
                                placeholder="Digite aqui sua senha"
                                {...register("password")}
                            />
                            {errors.password?.message && 
                                <span className="error-message">
                                    {errors.password.message}
                                </span>}
                        </div>

                        <div className="input-container">
                            <input type="password"
                                placeholder="Digite novamente sua senha"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword?.message && 
                                <span className="error-message">
                                    {errors.confirmPassword.message}
                                </span>}
                        </div>

                        <div className="input-container">
                            <input type="text"
                                placeholder="Fale sobre você"
                                {...register("bio")}
                            />
                            {errors.bio?.message && 
                                <span className="error-message">
                                    {errors.bio.message}
                                </span>}
                        </div>

                        <div className="input-container">
                            <input type="text"
                                placeholder="Opção de contato"
                                {...register("contact")}
                            />
                            {errors.contact?.message && 
                                <span className="error-message">
                                    {errors.contact.message}
                                </span>}
                        </div>
                        

                        <select onChange={(event) => setCourseModule(event.target.value)} name="Selecione seu módulo" id="modulos">
                            <option value="Primeiro módulo (Introdução ao Frontend)">
                                Primeiro módulo (Introdução ao Frontend)
                            </option>

                            <option value="Segundo módulo (Frontend Avançado)">
                                Segundo módulo (Frontend Avançado)
                            </option>

                            <option value="Terceiro módulo (Introdução ao Backend)">
                                Terceiro módulo (Introdução ao Backend)
                            </option>

                            <option value="Quarto módulo (Backend Avançado)">
                                Quarto módulo (Backend Avançado)
                            </option>
                        </select>

                        <button id="register-btn" type="submit"> Cadastrar </button>
                    </form>

                    {successfulRegistered === true ? (
                        <Redirect to="/" />
                    ) : (
                        null
                    )}

                            <Modal
                                contentLabel="onRequestClose Example"
                                isOpen={modal}
                                onRequestClose={() => handleModal()}
                                className="register-modal"
                                overlayClassName="register-overlay" >

                                <div className="alert-modal">
                                    <p>Algo deu errado ao criar sua conta, 
                                    verifique os dados e tente novamente
                                    </p>

                                    <button className="close-register-modal" onClick={() => handleModal()}> X </button>

                                </div>
                            </Modal>
                </div>
            </div>
        </div>
    )
}
/*<Modal
                            contentLabel="onRequestClose Example"
                            isOpen={modal}
                            onRequestClose={() => handleModal()}
                            className="register-modal"
                            overlayClassName="register-overlay" >

                            <div className="alert-modal">
                                <p>Algo deu errado ao criar sua conta, 
                                   verifique os dados e tente novamente
                                </p>

                                <button className="close-register-modal" onClick={() => handleModal()}> X </button>

                            </div>
                        </Modal>*/

export default Register