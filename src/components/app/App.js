import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";

import decoration from '../../resources/img/vision.png';



const App = () => {

    const [tab, setTab] = useState('Characters');

    const [selectedChar, setSelectedChar] = useState(null)

   const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    const onTab = (tab) => {
        setTab(tab);
    }

    const content = () => {
        if (tab === 'Characters') {
            return (
                <>
                <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                    </>
            )
        } else {
            return <ComicsList/>;
        }
    }

        return (
            <div className="app">
                <AppHeader onTab={onTab}/>
                <main>
               {content()}
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
}

export default App;