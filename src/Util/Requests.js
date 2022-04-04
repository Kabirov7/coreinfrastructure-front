import axios from "axios";
import {MESSAGES, USERS} from "./Urls";

export function getToken(user) {
    return user['tokenType'] + ' ' + user['accessToken'];
}

export function getUsers(url, setter, headers) {
    axios.get(USERS + url, {headers: headers}).then((response) => {
        console.log(response.data)
        setter(response.data)
    }).catch(function (err) {
        alert("Something went wrong: " + url);
    });
}

export function loadMessages(url, setter, headers) {
    axios.get(MESSAGES + url, {headers: headers}).then((response) => {
        console.log(response.data)
        setter(response.data)
    }).catch(function (err) {
        alert("Something went wrong: " + url);
    });
}
