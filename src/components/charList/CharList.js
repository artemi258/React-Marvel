import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

        const [char, setChar] = useState([])
        const [newItemLoading, setNewItemLoading] = useState(false)
        const [offset, setOffset] = useState(210)
        const [ended, setEnded] = useState(false)
        const [character, setCharacter] = useState(0)
    
   const {getAllCharacters, loading, error, clearError} = useMarvelServices();

      const  onCharLoaded = (charList) => {
            let ended = false;
            if (offset >= 1550) {
                ended = true;
            }
            setChar(char => [...char, ...charList])

            setNewItemLoading(false)
            setOffset(offset => offset + 9)
            setCharacter(character => character + 9)
            setEnded(ended)
        }

      const  onRequest = (offset) => {
        console.log(`${offset} ${character}`)
        setNewItemLoading(true)
            clearError();
            getAllCharacters(offset)
            .then(onCharLoaded)
            .catch()
        }


        const myRef = useRef([]);
        
       const onRef = (id) => {
            myRef.current[id].focus();
              } 
                      

        useEffect(() => {
            if (localStorage.getItem('offset') > 0 && localStorage.getItem('character') > 0) {
                setOffset(+(localStorage.getItem('offset')))
                setCharacter(+(localStorage.getItem('character')))
                onRequest(+(localStorage.getItem('offset')), +(localStorage.getItem('character')))
            } else {
                onRequest()
            }
            
            return () => {
                localStorage.setItem('offset', +offset)
                localStorage.setItem('character', +character)
            }
                
            
        }, [])

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        return (
            <div className="char__list">
                
                {errorMessage}
                {chars()}
                {spinner}
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