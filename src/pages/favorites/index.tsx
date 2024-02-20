import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import MusicCard from '../../components/MusicCard';
import Carregando from '../../components/Carregando';
import { SongType } from '../../types';
import styles from './Favorites.module.css';

function Favorites() {
  const [favoriteTracks, setFavoriteTracks] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorites = (trackId: number) => {
    setFavoriteTracks((prevState) => prevState
      .filter((song) => song.trackId !== trackId));
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const favoritesSongs = await getFavoriteSongs();
      setIsLoading(false);
      setFavoriteTracks(favoritesSongs);
    }
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <div className={ styles.container }>
      {isLoading && <Carregando />}
      <h1>Lista de Favoritos</h1>
      {favoriteTracks.map((favTrack) => (
        <MusicCard
          key={ favTrack.trackId }
          handleFavorites={ () => handleFavorites(favTrack.trackId) }
          { ...favTrack }
        />
      ))}
    </div>
  );
}

export default Favorites;
