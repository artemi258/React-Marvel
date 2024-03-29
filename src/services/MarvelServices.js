import { useHttp } from "../hooks/http.hook";

const MarvelServices = () => {
    
    const {loading, request, error, clearError, process, setProcess} = useHttp();

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
    const getCharacterName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getComics = async (offset = _baseOffset, limit = _baseLimit) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`);
                return res.data.results.map(item => _transformComics(item));
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
       const descr = !char.description ? "К сожалению, описания этого персонажа нет" : char.description;
       const description = descr.length > 200 ? descr.substr(0, 200) + "..." : descr;

        return {
                id: char.id,
                name: char.name,
                description: description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
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

    return {getAllCharacters, getCharacter, getComics, loading, error, clearError, getComic, getCharacterName, process, setProcess}
}

export default MarvelServices;