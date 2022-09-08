import { useState, useRef, useEffect, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

import useMarvelServices from '../../services/MarvelServices';

import './charList.scss';

const CharList = (props) => {

        const [char, setChar] = useState([])
        const [newItemLoading, setNewItemLoading] = useState(false)
        const [offset, setOffset] = useState(210)
        const [ended, setEnded] = useState(false)
    
   const {getAllCharacters, clearError, process, setProcess} = useMarvelServices();

      const  onCharLoaded = (charList) => {
            let ended = false;
            if (offset >= 1550) {
                ended = true;
            }
            setChar(char => [...char, ...charList])

            setNewItemLoading(false)
            setOffset(offset => offset + 9)
            setEnded(ended)
        }

      const  onRequest = (offset, character) => {
        setNewItemLoading(true)
            clearError();
            getAllCharacters(offset, character)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
        }


        const myRef = useRef([]);
        
       const onRef = (id) => {
            myRef.current[id].focus();
              } 

        useEffect(() => {
                onRequest()
                // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const content = useMemo(() => {
           return setContent(process, () => chars())
           // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [process]);

        return (
            <div className="char__list">
                {process === 'loading' ? chars() : null}
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
            <CSSTransition key={id} timeout={1000} classNames="charListAnimate">
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
            </CSSTransition>
            )
        }) 
                    return   <ul className="char__grid">
                        <TransitionGroup component={null}>
                                {content}
                        </TransitionGroup>
                             </ul>

                }
}

    

        CharList.propTypes = {
            onCharSelected: PropTypes.func
        }
    

export default CharList;