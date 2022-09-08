import { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../charSearchForm/charSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null)

   const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <HelmetProvider>
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
                        <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={onCharSelected}/>
                        </ErrorBoundary>
                        <div className="char__block">
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <SearchForm/>
                        </ErrorBoundary>
                        </div>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
        </HelmetProvider> 
    )
}

export default MainPage;