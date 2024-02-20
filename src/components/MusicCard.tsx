import { useState, useEffect } from 'react';
import checkedHeart from '../images/heartSolid.png';
import emptyHeart from '../images/heartRegular.png';
import { SongType } from '../types';
import styles from './MusicCard.module.css';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({
  trackName,
  previewUrl,
  trackId,
  handleFavorites = undefined }:SongType & { handleFavorites?: ()=> void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (handleFavorites) {
      handleFavorites();
    }
  };

  const handleFavorite = () => {
    if (!isChecked) {
      addSong({
        trackName,
        previewUrl,
        trackId,
      });
    } else {
      removeSong({
        trackName,
        previewUrl,
        trackId,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const favoritesTracks = await getFavoriteSongs();
      setIsChecked(favoritesTracks.some((track) => track.trackId === trackId));
      setIsLoading(false);
    }
    fetchData();
  }, [trackId]);

  return (
    <div className={ styles.musicCard }>
      <div className={ styles.audio }>
        <h3>{trackName}</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
      <label
        data-testid={ `checkbox-music-${trackId}` }
        htmlFor={ trackName }
        className="heart-checkbox"
      >
        <input
          type="checkbox"
          id={ trackName }
          name="favoriteSong"
          checked={ isChecked }
          onChange={ handleChange }
          onClick={ handleFavorite }
        />
        <img
          src={ isChecked ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
