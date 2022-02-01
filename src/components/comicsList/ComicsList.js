import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
    const [char, setChar] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false)


    const {getComics, loading, error, clearError} = useMarvelServices();

    useEffect(() => {
        onRequest();
    }, [])

    const  onCharLoaded = (charList) => {
        setNewItemLoading(false)

        setChar(char => [...char, ...charList])

        setOffset(offset => offset + 9)
    }

  const  onRequest = (offset) => {
    setNewItemLoading(true)

        clearError();
        getComics(offset, 12)
        .then(onCharLoaded)
        .catch()
    }

    const comicsList = () => {
        const content = char.map((item, i) => {
            return (
                    <li className="comics__item" key={i}>
                        <Link to={`${item.id}`}>
                            <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
            )
        })
            return <ul className="comics__grid">
                        {content}
                    </ul>;
        
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
                {errorMessage}
                {spinner}
                {comicsList()}
            <button disabled={newItemLoading} onClick={() => onRequest(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;