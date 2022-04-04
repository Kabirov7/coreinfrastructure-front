import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import "./Chat.css"
export default function MessageItem(props) {

return (
        <div className={props.isMine ? "message_item message_mine" : "user_item message_not_mine"}>
            <li>{props.message.text}</li>
        </div>
    )

}