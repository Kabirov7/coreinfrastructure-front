import {useEffect, useState} from "react";
import useUser from "../../Util/User/useUser";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {getToken, getUsers} from "../../Util/Requests";
import axios from "axios";
import {USERS} from "../../Util/Urls";
import OneFriend from "./OneFriend";


const styles = {
    bgcolor: '#DFDCDB',
    color: 'black',
    '& .Mui-selected': {
        '& .MuiBottomNavigationAction-label': {
            fontWeight: 'bold',
            color: 'black'
        }
    }
};

export const Profile = ({props}) => {
    const {user, setUser} = useUser();
    const [friends, setFriends] = useState([]);
    const [notFriends, setNotFriends] = useState([]);
    const [value, setValue] = useState(0);
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": getToken(user)
    }

    useEffect(() => {
        console.log('fasl;fjals;dfjk')
        getUsers('/friends', setFriends, headers)
        getUsers('/not_friends', setNotFriends, headers)
    }, [])

    function addFriend(id, index) {
        axios.get(USERS + "/" + id + '/add_friend', {headers: headers}).then((response) => {
            friends.push(notFriends[index])
            setFriends(friends)
            var dublicatedFriends = [...notFriends]
            var part1 = dublicatedFriends.splice(0, index)
            var part2 = notFriends.splice(index + 1)
            setNotFriends(part1.concat(part2))

        }).catch(function (err) {
            alert("Something went wrong trying add new friend with id: " + id);
        });
    }

    return (
        <div className="profile-container">
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    sx={styles}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="My friends"/>
                    <BottomNavigationAction label="Future friends"/>
                </BottomNavigation>
            </Paper>
            <div style={{paddingTop:100, paddingBottom:100}}>
                {value == 0 ? <div>{
                        friends.map((item, index) => {
                            return <OneFriend email={item['email']} id={item['id']} index={index} isFriend={true}
                                              addFriend={addFriend}/>
                        })
                    }</div> :
                    <div>
                        {
                            notFriends.map((item, index) => {
                                return <OneFriend email={item['email']} id={item['id']} index={index} isFriend={false}
                                                  addFriend={addFriend}/>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;