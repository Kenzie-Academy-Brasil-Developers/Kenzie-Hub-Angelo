import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --pink: #FF577F;
        --pink-focus: #FF427F;
        --pink-negative: #59323F;
        --grey-4: #121214;
        --grey-3: #212529;
        --grey-2: #343B41;
        --grey-1: #868E96;
        --grey-0: #F8F9FA;
        --sucess: #3FE864;
        --negative: #E83F5B;
    }

    body {
        font-family: 'Inter', sans-serif;
        background-color: #000000;
    }

    h1 {
        color: var(--pink);
    }

    h2 {
        color: var(--grey-0);
    }

    button {
        cursor: pointer;
    }

    input, select {
        width: 100%;
        padding: 10px;

        background-color: var(--grey-2);
        
        border-radius: 4px;
        border: 1.22px solid var(--grey-0);
        
        color: #fff;
    }

    select {
        padding-rigth: 20px;
        color: rgb(117, 117, 117)
    }
    
    form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        gap: 30px;
    
        padding-top: 20px;

        border-radius: 8px;

        width: 100%
    }
`