import { Helmet, HelmetProvider } from 'react-helmet-async';

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";


const ComicsPage = () => {
    return (
        <HelmetProvider>
        <>
            <Helmet>
                    <meta
                        name="description"
                        content="Marvel comics"
                        />
                        <title>Marvel comics</title>
                </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
        </HelmetProvider>
    )
}

export default ComicsPage;