import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import "./Chat.css"
export default function UserItem(props) {

return (
        <div className={props.isSelected ? "user_item user_selected" : "user_item"}>
            <li onClick={() => props.setChat(props.chat.id)}>{props.chat.email}</li>
        </div>
    )

}