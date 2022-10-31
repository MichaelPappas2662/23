import React, {useState} from "react";


const TextInput = props => {
    const [clientInput, setClientInput] = useState(props.value || "");
    const [markUp, setMarkUp] = useState(0);

    const handleClientInput = (event) => {
        setClientInput(event.target.value);
    }
    const handleMarkDownAndClientInput = (event) => {
        handleClientInput(event);
        const markup = 0.7612 * 0.005;
        console.log(markup);
        const payTronRate = 0.7612 - markup;
        const payTron = clientInput -  payTronRate ;
        console.log(payTron);
        setMarkUp(payTron);
    }


    return (
        <div>
            <h2>Amount to Convert</h2>
            <input
                type="number"
                value={clientInput}
                onChange={handleMarkDownAndClientInput}
            />
            <p>Original Price: {clientInput}</p>
            <p>Price with MarkUp: {clientInput - markUp}</p>
        </div>
    );
};

export default TextInput;