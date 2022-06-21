import "./style.css"

import { Link, Redirect } from "react-router-dom"

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from "react-hook-form";

import  Modal  from "react-modal";
import { useState } from "react";

import Nav from "../../components/nav"
import axios from "axios"
import Technology from "../../components/technology"

Modal.setAppElement("#root")

function Home( { baseUrl, user, setTechs, techs } ) {
    const token = localStorage.getItem("@token")

    const [modal, setModal] = useState(false)
    const [courseModule, setCourseModule] = useState("Iniciante")

    const registerSchema = yup.object().shape({
        title: yup.string()
                  .required("Campo obrigatório"),
    })

    function handleModal () {
        if (modal === false) {
            setModal(true)
        } else {
            setModal(false)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const techData = (techData) => {
        techData.status = courseModule

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post(`${baseUrl}/users/techs`, techData, config)
             .then(res => {
                techData.id = res.data.id
                setTechs(techs.concat(techData))
                setModal(false)
            })
             .catch(err => {
                setModal(false)
                console.log(err)
            })
    }

    return (
        <>
            {!token && <Redirect to="/" />}
           
            <div id="home-page">
                <Nav user={user}/>

                <div id="home-page-container">
                    <main id="home-page-main">
                        <div id="main-header">
                            <p>
                                Tecnologias
                            </p>

                            <button onClick={() => handleModal()}> + </button>
                            <Modal
                                contentLabel="onRequestClose Example"
                                isOpen={modal}
                                onRequestClose={() => handleModal()}
                                className="modal"
                                overlayClassName="overlay" >

                                <header id="modal-header">
                                    Cadastrar tecnologia

                                    <button onClick={() => handleModal()}> X </button>
                                </header>

                                <div className="modal-inputs">
                                        
                                    <form onSubmit={handleSubmit(techData)}>
                                        <div className="input-container">
                                            <input type="text"
                                                    placeholder="Qual a tecnologia que deseja adicionar?"
                                                    {...register("title")}
                                            />
                                            {errors.title?.message && 
                                                <span className="error-message">
                                                    {errors.title.message}
                                                </span>}
                                        </div>

                                        <select onChange={(event) => setCourseModule(event.target.value)} name="teste" id="tech-level">
                                            <option value="Iniciante">
                                                Iniciante
                                            </option>

                                            <option value="Intermediário">
                                                Intermediário
                                            </option>

                                            <option value="Avançado">
                                                Avançado
                                            </option>
                                        </select>

                                        <button type="submit"> Cadastrar tecnologia</button>
                                     </form>

                                </div>
                            </Modal>

                            <Modal>

                            </Modal>
                        </div>

                        <div id="main-content">
                            {techs?.map((element, index) => 
                                <Technology techs={techs}
                                            setTechs={setTechs}
                                            token={token}
                                            baseUrl={baseUrl}
                                            key={index}
                                            id={element.id}
                                            techName={element.title}
                                            techDifficulty={element.status}/>
                                )}
                        </div>
                    </main>

                </div>

            </div>
        </>
    )
}

export default Home