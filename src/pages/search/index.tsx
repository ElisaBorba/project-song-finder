import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchAlbumsAPI, { AlbumType } from '../../services/searchAlbumsAPI';

const INITIAL_SEARCH_STATE = {
  search: '',
};

export type SearchValueType = {
  search?: string | undefined,
};

function Search() {
  const [searchValue, setSearchValue] = useState<SearchValueType>(INITIAL_SEARCH_STATE);
  const { search } = searchValue;
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const albumsResult: AlbumType[] = await searchAlbumsAPI(String(search));
      console.log('Álbuns encontrados:', albumsResult);

      setAlbums(albumsResult);
      setSearchValue(INITIAL_SEARCH_STATE);
      setShowResult(true);
    } catch (error: any) {
      throw new Error('Nenhum álbum foi encontrado');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });

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
      <form onSubmit={onSubmit}>
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            placeholder="Nome do Artista"
            value={search}
            onChange={onChange}
            required
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={!validateSearch()}
        >
          Pesquisar
        </button>
      </form>

      {showResult && (
        <div>
          <h2>Resultado de álbuns de: {search}</h2>
          <ul>
            {albums.map((album) => (
              <li key={album.artistId}>
                <p>{album.collectionName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
