import {useState} from 'react';

export default function useUser() {
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return user
    };
    const [user, setUser] = useState(getUser());

    const saveUser = userToken => {
        if (userToken != undefined) {
            localStorage.setItem('user', JSON.stringify(userToken));
            setUser(userToken);
        }
    };

    return {
        setUser: saveUser,
        user
    }
}