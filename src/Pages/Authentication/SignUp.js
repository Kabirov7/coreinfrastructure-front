import PropTypes from "prop-types";
import {useState} from "react";

const {SIGNUP} = require("../../Util/Urls");
const axios = require("axios");
const {loginUser} = require("./Login");

async function signup(credentials) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    credentials['role'] = ['user']

    axios.post(SIGNUP, credentials).then((response) => {
        var loginCredentials = {
            email: credentials['email'],
            password: credentials['password']
        }
        console.log("credentials")
        console.log(credentials)

        return loginUser(loginCredentials);
    }).catch(function (err) {
        alert("This email is using by another user.");
    });

}

export default function SignUp({setUser}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        let user = await signup({
            username,
            email,
            password
        });
        setUser(user);
    }

    return (
        <div className="login-wrapper">
            <h1>Please Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
}