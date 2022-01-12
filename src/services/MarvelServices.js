

class MarvelServices {
    
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1edd0447276bb1866d74649bfc5c1316';
    _baseOffset = 210;
    _baseLimit = 9;

     getResurce = async (url) => {
         let res = await fetch(url);

         if (!res.ok) {
             throw new Error(`Could not Fetch ${url}, status: ${res.status}`);
         }

         return await res.json();
     }

     getAllCharacters = async (offset = this._baseOffset, limit = this._baseLimit) => {
         const res = await this.getResurce(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
                return res.data.results.map(this._transformCharacter);
     }
     getCharacter = async (id) => {
        const res = await this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelServices;