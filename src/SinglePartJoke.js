import {Button} from "react-bootstrap";

export default function SinglePartJoke (props) {

        return (
            <>
            <h5>{props.joke}
                &emsp;
                <img src={'joke.png'}
                 alt={'laughing emoticon'}
                 width={50}/>
            </h5>
            <br/>
            <Button variant="success"
                    type="button"
                    onClick={props.getJoke}>
                 Get another joke
            </Button>
            </>
        )
    }

