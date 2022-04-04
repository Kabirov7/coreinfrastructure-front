// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export default function OneFriend(props) {

    return (
        <div>
            <Card sx={{maxWidth: 345, marginTop:"10px"}}>
                {/*<AccountCircleIcon/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.email}
                    </Typography>
                                    {!props.isFriend ?

                    <Typography variant="body2" color="text.secondary">
                       Add me to your friends
                    </Typography> : <Typography variant="body2" color="text.secondary">
                       You are friends
                    </Typography>}
                </CardContent>
                {!props.isFriend ?
                    <CardActions>
                        <Button  onClick={() => props.addFriend(props.id, props.index)}>Follow</Button>
                    </CardActions>
                    : <div></div>}
            </Card>
        </div>
    )
}