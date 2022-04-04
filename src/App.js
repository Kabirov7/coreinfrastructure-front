import useUser from "./Util/User/useUser";
import AuthenticatePage from "./Pages/Authentication/AuthenticationPage";
import {BrowserRouter, } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {useState} from "react";
import Chat from "./Pages/Chat/Chat";



function App() {
    const {user, setUser} = useUser();
    const [value, setValue] = useState(1);

    if (!user) {
        return <AuthenticatePage setUser={setUser}/>
    }

    const goFriend = () => {
    };

    const goChat = () => {
    };

    const logout = () => {
        localStorage.removeItem("user");
        this.props.history.push("/");
    };

    return (
        <div>

            <BrowserRouter>
                <Paper sx={{position: 'fixed', top: 0, left: 0, right: 0}} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label={user['email']} disabled={true}/>
                        <BottomNavigationAction onClick={() => goFriend()} label="Friends"/>
                        <BottomNavigationAction onClick={() => goChat()} label="Chats"/>
                        <BottomNavigationAction onClick={() => logout()} label="Logout"/>
                    </BottomNavigation>
                </Paper>
                {value==1?
                <Profile setUser={setUser}/>:
                    <Chat />
                }
            </BrowserRouter>
        </div>
    );
}

export default App;
