import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComic.scss';

const SingleComic = () => {

    const [comic, setComic] = useState(null);
    const {comicId} = useParams();
    const {getComic, loading, error, clearError} = useMarvelServices();

    useEffect(() => {
        updaterComic();
    }, [comicId])



   const updaterComic = () => {
        clearError();
        getComic(comicId)
        .then(onComicLoaded)
        .catch()
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }


        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


    const View = ({comic}) => {

        const {thumbnail, title, description, pageCount, language, price} = comic;

        return (
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }
export default SingleComic;