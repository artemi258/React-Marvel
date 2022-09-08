import { useState, useEffect, history } from "react";
import { useParams } from "react-router-dom";

import useMarvelServices from "../../services/MarvelServices";
import setContent from '../../utils/setContent';


    const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {getComic, getCharacterName, error, clearError, setProcess, process} = useMarvelServices();

        useEffect(() => {
            updater();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [id])

        const updater = () => {
            clearError();

            switch(dataType) {
                case "character": 

                getCharacterName(id)
                .then(onLoaded)
                .then(() => setProcess('confirmed'));
            break;

                case "comic": 
                getComic(id)
                .then(onLoaded)
                .then(() => setProcess('confirmed'));
            break;

            default:
            break;
            }
        }
    
        const onLoaded = (data) => {
            setData(data)
        }

        if (error) {
            history('/error')
        }

    return (
        <>
            {setContent(process, Component, data)}
        </>
    )
    }

    export default SinglePage;