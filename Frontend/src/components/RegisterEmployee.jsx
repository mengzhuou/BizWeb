import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";


function RegisterEmployee() {
    const [empFirstName, setEmpFirstName] = useState("");
    const [empLastName, setEmpLastName] = useState("");
    const [empUsername, setEmpUsername] = useState("");
    const [empPassword, setEmpPassword] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "empFirstName") {
            setEmpFirstName(value);
        }
        if (id === "empLastName") {
            setEmpLastName(value);
        }
        if (id === "empUsername") {
            setEmpUsername(value);
        }
        if (id === "empPassword") {
            setEmpPassword(value);
        }
    };

    const handleSubmit = () => {
        // Create an object to hold the client data
        const clientData = {
            empFirstName,
            empLastName,
            empUsername,
            empPassword
        };
    }

    return (
        <>
            <div>
                <h1>Register Client</h1>
                <div>
                <label htmlFor="empFirstName">First Name: </label>
                <input
                    type="text"
                    value={empFirstName}
                    onChange={(e) => handleInputChange(e)}
                    id="empFirstName"
                    placeholder="First name"
                />
                </div>
                
                <div>
                <label htmlFor="empLastName">Last Name: </label>
                <input
                    type="text"
                    id="empLastName"
                    value={empLastName}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Last name"
                />
                </div>

                <div>
                    <label htmlFor="empUsername">Username: </label>
                    <input
                        type="text"
                        id="empUsername"
                        value={empUsername}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Username"
                    />
                </div>
                
                <div>
                    <label htmlFor="empPassword">Password: </label>
                    <input
                        type="text"
                        id="empPassword"
                        value={empPassword}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Password"
                    />
                </div>

            </div>
        </>
    )
}

export default RegisterEmployee;