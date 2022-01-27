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

    return {getAllCharacters, getCharacter, loading, error, clearError}
}

export default MarvelServices;