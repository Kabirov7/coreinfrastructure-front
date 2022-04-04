import useUser from "../../Util/User/useUser";
import {useEffect, useState} from "react";
import axios from "axios";
import {CHAT, USERS, WEBSOCKET} from "../../Util/Urls";
import {loadMessages, getToken} from "../../Util/Requests";
import "./Chat.css"
import UserItem from "./UserItem";
import MessageItem from "./MessageItem";
import {Button} from "@mui/material";

var stompClient = null;
const Chat = (props) => {
    const {user, setUser} = useUser();
    const [text, setText] = useState("");
    const [contacts, setContacts] = useState(null);
    const [activeContact, setActiveContact] = useState(0);
    const [messages, setMessages] = useState([]);
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*/*",
        "Authorization": getToken(user)
    }

    useEffect(() => {
        // axios.get(USERS + '/friends', {headers: headers}).then((response) => {
        //     setContacts(response.data)
        //     setActiveContact(response.data[0].id)
        //
        //     sessionStorage.setItem('activeContact', JSON.stringify(response.data[0].id))
        // }).catch(function (err) {
        //     alert("Something while /friends");
        // });

        connect()
    }, []);

    useEffect(() => {
        if (contacts != null && contacts.length > 0) {
            let active = sessionStorage.getItem('activeContact');
            console.log(active)
            loadMessages("/chat/" + active, setMessages, headers)
            // sessionStorage.setItem('activeContact', JSON.stringify(response.data[0]))

        }
    }, [contacts, activeContact]);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS(WEBSOCKET);
        stompClient = Stomp.over(SockJS, headers);
        stompClient.connect(headers, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + user['id'] + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const getActiveChat = () => {
        return JSON.parse(sessionStorage.getItem("activeContact"));
    }

    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        const active = getActiveChat();

        if (active.id === notification.sender.id) {
            loadMessages("/chat/" + active, setMessages, headers)
        } else {
            console.log("Received a new message from " + notification.sender.email);
        }
    };

    function sendMessage() {
        if (text !== "") {
            var target = getActiveChat();
            var message = {
                text: text,
                sender: {id: user['id'], email: user['email']},
                target: {id: target['id'], email: target['email']}
            }

            console.log(message)

            messages.push(message)
            setMessages(messages);
            stompClient.send(CHAT, headers, JSON.stringify({
                text: text,
                target: target['id'],
                sender: user['id']
            }));
        }
    }


    const handleSetCurrentChat = (id) => {
        sessionStorage.setItem('activeContact', id)
        setActiveContact(id)
    }

    return (<div style={{marginTop:50}}>
                <div id={"contacts"}>
                    <ul>
                        {contacts ? contacts.map((e) => {
                            const isSelected = activeContact == e.id;
                            return <UserItem isSelected={isSelected} setChat={handleSetCurrentChat} chat={e}/>
                        }) : <div></div>
                        }
                    </ul>
                </div>
                <div id={"messages"}>
                    <ul>
                        {messages ? messages.map((e) => {
                            const isMine = e.sender.id == user.id;
                            return <MessageItem isMine={isMine} message={e}/>
                        }) : <div></div>
                        }
                    </ul>
                </div>
            <div className="message-input">
                <div className="wrap">
                    <input
                        name="user_input"
                        size="large"
                        placeholder="Write message"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                sendMessage(text);
                                setText("");
                            }
                        }}
                    />

                    <button
                        onClick={() => {
                            sendMessage(text);
                            setText("");
                        }}
                    >Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;