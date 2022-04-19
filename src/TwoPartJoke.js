import {useState} from 'react';
import {Button} from "react-bootstrap";

    function TwoPartJoke (props) {

        const [hidden, setHidden] = useState(true)

        return (
            <>
            <h5>{props.jokeSetup}</h5>
            <br/>
            <Button variant="outline-dark"
                     type="button"
                     size="sm"
                     onClick={() => setHidden(!hidden)}>
                 {hidden ? 'Reveal punchline' : 'Hide punchline'}
            </Button>
                 <br/><br/>
            { !hidden &&
            <h5>
                {props.jokeDelivery}
                &emsp;
                <img src={'joke.png'}
                     alt={'laughing emoticon'}
                     width={50}/>
            </h5>}
            <br/>
            { !hidden &&
            <Button
                    variant="success"
                    type="button"
                    onClick={() => {props.getJoke(); setHidden(true)}}>
                 Get another joke
            </Button>}
            </>
        )

}

export default TwoPartJoke