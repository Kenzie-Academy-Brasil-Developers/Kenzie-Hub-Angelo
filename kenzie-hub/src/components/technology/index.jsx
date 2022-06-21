import axios from "axios"
import { useEffect, useState } from "react"
import { CgTrash } from "react-icons/cg"

import "./style.css"

function Technology( { techName, techDifficulty, id, baseUrl, token, setTechs, techs }) {
    const [delTarget, setDelTarget] = useState("")

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.delete(`${baseUrl}/users/techs/${delTarget}`, config)
             .then(res => {
                const filterTechs = techs.filter(element => {
                    if (element.id !== delTarget) {
                        return element
                    }
                })
                setTechs(filterTechs)
            })
             .catch(err => {
                console.log(err)
            })
    }, [delTarget])

    return (
        <div className="technology">
            <p className="technology-name">
                {techName}
            </p>

            <div>
                <p className="difficulty-level">
                    {techDifficulty}
                </p>

                <button onClick={() => setDelTarget(id)} id={id} className="delete-btn">
                    <CgTrash id={id}/>
                </button>
            </div>
        </div>
    )
}

export default Technology