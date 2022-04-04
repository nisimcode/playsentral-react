import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {GameDetails} from "./GameDetails";

export class GameThreads extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }


    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export const WrappedGameThreads = props => {
    const {gameId} = useParams()
    const navigate = useNavigate()
    return <GameThreads gameId={gameId} navigate={navigate} {...props} />

}