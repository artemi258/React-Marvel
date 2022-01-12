import { Component } from 'react/cjs/react.development';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Sceleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: null,
            loading: false,
            error: false
        }
    }
    
    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updaterChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updaterChar();
        }
    }

    updaterChar = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }
        this.setState({
            loading: true,
            error: false
        })
        this.marvelServices
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
            error: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const {char, loading, error} = this.state;
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
                            {item.name}
                        </li>
                            )
                        })}
                </ul>
            </>
        )
    }

export default CharInfo;