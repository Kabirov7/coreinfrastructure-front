import {useState} from "react";
import "./Auth.css"
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthenticatePage({setUser}) {
    const [value, setValue] = useState("login");

    return (<div>
        <div className={"auth_container"}>
            <button className={"login"} onClick={() => setValue("login")}>Login</button>
            <button className={"signup"} onClick={() => setValue("signup")}>SignUp</button>
        </div>
        {<div style={{paddingTop: 40}}>{
            value == "login" ? <Login  setUser={setUser}/> : <SignUp setUser={setUser}/>
        }</div>}
    </div>)

}
