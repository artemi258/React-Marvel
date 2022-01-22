import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

        const [char, setChar] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(false)
        const [newItemLoading, setNewItemLoading] = useState(false)
        const [offset, setOffset] = useState(210)
        const [ended, setEnded] = useState(false)
    
   const marvelChar = new MarvelServices();

      const  onCharLoaded = (charList) => {
            let ended = false;
            if (offset >= 1550) {
                ended = true;
            }
            setChar(char => [...char, ...charList])
            setLoading(false)
            setError(false)
            setNewItemLoading(false)
            setOffset(offset => offset + 9)
            setEnded(ended)
        }

      const  onRequest = (offset) => {
            onCharListLoading()
            marvelChar
            .getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onError)
        }

      const  onCharListLoading = () => {
        setNewItemLoading(true)
        }

      const  onError = () => {
        setError(true)
        setLoading(false)
        }

        const myRef = useRef([]);
        
       const onRef = (id) => {
            myRef.current[id].focus();
              } 
                      

        useEffect(() => {
            onRequest()
        }, [])

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? chars() : null;
        return (
            <div className="char__list">
                
                {errorMessage}
                {spinner}
                {content}
                
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset)}
                        style={{display: ended ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
        function chars() {
            const content = char.map((item, i) => {
        
            const {name, thumbnail, id} = item;
            const objFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "contain" : "cover";
            return (
            <li className="char__item" key={id}
            onClick={() => {
                props.onCharSelected(id);
                onRef(i)
            }}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    props.onCharSelected(id);
                    onRef(i)
                 }
            }}
            ref={ref => myRef.current[i] = ref}>
                <img src={thumbnail} style={{objectFit: objFit}} alt={name}/>
                <div className="char__name">{name}</div>
            </li> 
            )
        }) 
                    return   <ul className="char__grid">
                                {content}
                                </ul>
        
                }
}

    

        CharList.propTypes = {
            onCharSelected: PropTypes.func
        }
    

export default CharList;