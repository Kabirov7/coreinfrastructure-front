import {useState} from "react";
import {SIGNIN} from "../../Util/Urls";
import axios from "axios";
import PropTypes from "prop-types";
import "./Auth.css"

export async function loginUser(credentials) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return axios.post(SIGNIN, credentials).then((response) => {
        return response.data
    }).catch(function (err) {
        console.log("Check your credentials");
    });

}

export default function Login({setUser}) {
    const [email, setEmail] = useState("artur@email.com");
    const [password, setPassword] = useState("123123");
    const handleSubmit = async e => {
        e.preventDefault();
        let user = await loginUser({
            email,
            password
        });
        setUser(user);
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form className={"form_input"} onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button className={"submit_btn"} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}