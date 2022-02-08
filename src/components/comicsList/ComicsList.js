import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
    const [char, setChar] = useState([]);
    const [offset, setOffset] = useState(210);
    const [comics, setComics] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const history = useNavigate();

    const {getComics, loading, error, clearError} = useMarvelServices();

    useEffect(() => {
        // if (localStorage.getItem('offsetComics') > 210 && localStorage.getItem('comics') > 0) {  // если не первый запуск , то выполнять

        //     setOffset(+(localStorage.getItem('offsetComics')) - 12)       // если переходить с комиксов + 9 к лимиту и персонажам не делать
        //     setComics(+(localStorage.getItem('comics')) - 12)
        //     onRequest(210, +(localStorage.getItem('comics')))
        // } else {
        //     onRequest(210, 12)
        // }
            onRequest(210, 12)

    }, [])

    // useEffect(() => {
    //     if (offset > 210 && comics > 0) {        //если новые данные еще не записались, то в локал не записывать
    //         localStorage.setItem('offsetComics', offset)
    //         localStorage.setItem('comics', comics)
    //     }
    // }, [offset, comics])

    const  onCharLoaded = (charList) => {
        setNewItemLoading(false)

        setChar(char => [...char, ...charList])

        setOffset(offset => offset + 12)
        setComics(comics => comics + 12)
    }

  const  onRequest = (offset, comics) => {
    setNewItemLoading(true)

        clearError();
        getComics(offset, comics)
        .then(onCharLoaded)
        .catch(() => onRequest(offset, 12))
    }

    const comicsList = () => {
        const content = char.map((item, i) => {
            return (
                <CSSTransition key={item.name} classNames="comics__item" timeout={1000}>
                    <li className="comics__item" key={i}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                    </CSSTransition>
            )
        })
            return <ul className="comics__grid">
                <TransitionGroup component={null}>
                        {content}
                </TransitionGroup>
                    </ul>;
        
    }

            if (error) {
                history('/error')
            }
        const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
                {comicsList()}
                {spinner}
            <button disabled={newItemLoading} onClick={() => onRequest(offset, 12)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;