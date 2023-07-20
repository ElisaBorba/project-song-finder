import React, { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

const INITIAL_SEARCH_STATE = {
  search: '',
};

export type SearchValueType = {
  search?: string | undefined,
};

function Search() {
  const [searchValue, setSearchValue] = useState<SearchValueType>(INITIAL_SEARCH_STATE);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { search } = searchValue;
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [showAlbum, setShowAlbum] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const albumsResult: AlbumType[] = await searchAlbumsAPI(String(search));
      console.log('Álbuns encontrados:', albumsResult);

      setLoading(false);
      setAlbums(albumsResult);
      setSearchValue(INITIAL_SEARCH_STATE);
      setShowAlbum(true);
    } catch (error: any) {
      setLoading(false);
      throw new Error('Nenhum álbum foi encontrado');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
    setInputValue(value);
    validateSearch();
  };

  const validateSearch = (): boolean => {
    let valid = true;

    if (String(search).length < 2) {
      valid = false;
    }
    return valid;
  };

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            placeholder="Nome do Artista"
            value={ search }
            onChange={ onChange }
            required
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ !validateSearch() }
        >
          Pesquisar
        </button>
      </form>

      {showAlbum && (albums.length > 0
        ? (
          <div>
            <h2>
              Resultado de álbuns de:
              {' '}
              {inputValue}
            </h2>
            <ul>
              {albums.map((album) => (
                <li key={ album.collectionId }>
                  <h2>{album.collectionName}</h2>
                  <p>{album.artistName}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (<h3>Nenhum álbum foi encontrado </h3>))}
    </div>
  );
}

export default Search;
