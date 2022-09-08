import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
<<<<<<< HEAD

=======
import { CSSTransition, TransitionGroup } from 'react-transition-group';
>>>>>>> c274475a72e28e226f8a76c52cfe52d6d8b24df5
import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

import './comicsList.scss';

const ComicsList = () => {
    const [char, setChar] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const history = useNavigate();

    const {getComics, error, clearError, process, setProcess} = useMarvelServices();

    useEffect(() => {
            onRequest(210, 12)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const  onCharLoaded = (charList) => {
        setNewItemLoading(false)

        setChar(char => [...char, ...charList])

        setOffset(offset => offset + 12)
    }

  const  onRequest = (offset, comics) => {
    setNewItemLoading(true)

        clearError();
        getComics(offset, comics)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
        .catch(() => onRequest(offset, 12));
    }

    const comicsList = () => {
        const content = char.map((item, i) => {
            return (
                <CSSTransition key={item.name} classNames="comics__item" timeout={1000}>
                    <li className="comics__item" key={i}>
                        <Link to={`/marvelWeb/comics/${item.id}`}>
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

    return (
        <div className="comics__list">
                {process === 'loading' ? comicsList() : null}
                {setContent(process, () => comicsList(), char)}
            <button disabled={newItemLoading} onClick={() => onRequest(offset, 12)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;