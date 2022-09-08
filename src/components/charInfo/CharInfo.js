import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    
    const {getCharacter, clearError, process, setProcess} = useMarvelServices();
    useEffect(() => {
        updaterChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updaterChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

   const updaterChar = () => {
        clearError();
        const {charId} = props
        if (!charId) {
            return;
        }

        getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

        return (
                <div className="char__info">
                    {setContent(process, View, char)}
                </div>
        )
}

    const View = ({data}) => {
        const {name, description, thumbnail, homepage, wiki, comics} = data;
        const objFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "contain" : "cover";
        if (comics.length > 10) {
            comics.length = 10;
        }
        return (
            <TransitionGroup component={null}>
            <CSSTransition unmountOnExit={true} mountOnEnter={true} key={name} timeout={1000} classNames="charInfoAnimate">
            <div>
        <div className="char__basics">
                    <img src={thumbnail} alt={name} style={{objectFit: objFit}}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "комиксов нет"}
                    {comics.map((item, i) => {
                            return (
                        <li key={i} className="char__comics-item">
                            <Link to={`/marvelWeb/comics/${item.resourceURI.split("/").pop()}`}>{item.name}</Link>
                        </li>
                            )
                        })}
                </ul>
            </div>
            </CSSTransition> 
            </TransitionGroup> 
        )
        

    }

export default CharInfo;