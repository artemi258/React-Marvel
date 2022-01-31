import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComic } from "../pages";





const App = () => {

        return (
            <Router>
            <div className="app">
                <AppHeader/>
                <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComic/>}/>
                        </Routes>
                </main>
            </div>
            </Router>

        )
}

export default App;