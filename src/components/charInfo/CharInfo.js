import { useState, useEffect } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Sceleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    
    const {getCharacter, getComic, loading, error, clearError} = useMarvelServices();

    useEffect(() => {
        updaterChar();
    }, [])

    useEffect(() => {
        updaterChar();
    }, [props.charId])

   const updaterChar = () => {
        clearError();
        const {charId} = props
        if (!charId) {
            return;
        }

        getCharacter(charId)
        .then(onCharLoaded)
        .catch()
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

        const sceleton = char || loading || error ? null : <Sceleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
               {sceleton}
               {errorMessage}
               {spinner}
               {content}
            </div>
        )
}

    const View = ({char}) => {
        const {name, description, thumbnail, homepage, wiki, comics} = char;
        const objFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "contain" : "cover";
        if (comics.length > 10) {
            comics.length = 10;
        }

        return (
            <>
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
                            <Link to={`/comics/${item.resourceURI.split("/").pop()}`}>{item.name}</Link>
                        </li>
                            )
                        })}
                </ul>
            </>
        )
    }

export default CharInfo;