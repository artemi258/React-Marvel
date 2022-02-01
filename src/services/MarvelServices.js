import { useHttp } from "../hooks/http.hook";

const MarvelServices = () => {
    
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1edd0447276bb1866d74649bfc5c1316';
    const _baseOffset = 210;
    const _baseLimit = 9;


    const getAllCharacters = async (offset = _baseOffset, limit = _baseLimit) => {
         const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
                return res.data.results.map(_transformCharacter);
     }
     const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getComics = async (offset = _baseOffset, limit = _baseLimit) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`);
                return res.data.results.map(item => _transformComics(item, 'comics'));
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char, name) => {
       const descr = !char.description ? "К сожалению, описания этого персонажа нет" : char.description;
       const description = descr.length > 200 ? descr.substr(0, 200) + "..." : descr;

        return {
                id: char.id,
                name: name === 'comics' ? char.title : char.name,
                description: description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: name === 'comics' ? char.urls[0].url : char.urls[1].url,
                price: name === 'comics' ? char.prices[0].price : null,
                comics: name === 'comics' ? null : char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }

    return {getAllCharacters, getCharacter, getComics, loading, error, clearError, getComic}
}

export default MarvelServices;