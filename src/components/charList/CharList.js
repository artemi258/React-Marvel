import React, { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component{
    constructor(props) {
        super(props)

        this.state = {
            char: [],
            loading: true,
            error: false,
            newItemLoading: false,
            offset: 210,
            ended: false
        }
    }
    
    marvelChar = new MarvelServices();

        onCharLoaded = (charList) => {
            let ended = false;
            if (this.state.offset >= 1550) {
                ended = true;
            }
            this.setState(({offset, char}) => ({
                char: [...char, ...charList],
                loading: false,
                error: false,
                newItemLoading: false,
                offset: offset + 9,
                ended: ended
            }));
        }

        onRequest = (offset) => {
            this.onCharListLoading()
            this.marvelChar
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
        }

        onCharListLoading = () => {
            this.setState({
                newItemLoading: true
            })
        }

        onError = () => {
            this.setState({
                loading: false,
                error: true
            });
        }
        onKeyClick = (e) => {
            if (e.keyCode === 13) {
               this.props.onCharSelected(e.target.getAttribute('data-key'));
            }
        }
        onFocus = (ref) => {
                this.myRef = ref
        }
        onFocusRef = () => {
            if (this.myRef) {
                console.log(this.myRef)
                this.myRef.current.focus();
            }
        }
        onScroll = () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // для старых браузеров

            if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
                this.onRequest(this.state.offset);
            }
        }

        componentDidMount() {
            this.onRequest();
            window.addEventListener('scroll', this.onScroll)
            
        }

    render() {
        const {char, loading, error, newItemLoading, offset, ended} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Chars focusRef={this.onFocus} onKeyClick={this.onKeyClick} char={char} props={this.props}/> : null;
        return (
            <div className="char__list">
                
                {errorMessage}
                {spinner}
                {content}
                
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => this.onRequest(offset)}
                        style={{display: ended ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

    const Chars = ({char, props, onKeyClick, focusRef}) => {
    const content = char.map(item => {

    const {name, thumbnail, id} = item;
    const objFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "contain" : "cover";
    return (
    <li className="char__item" key={id}
    onClick={() => props.onCharSelected(id)}
    tabIndex={0}
    data-key={id}
    onKeyDown={onKeyClick}
    ref={focusRef}>
        <img src={thumbnail} style={{objectFit: objFit}} alt={name}/>
        <div className="char__name">{name}</div>
    </li> 
    )
}) 
            return   <ul className="char__grid">
                        {content}
                        </ul>

        }

        CharList.propTypes = {
            onCharSelected: PropTypes.func
        }
    

export default CharList;