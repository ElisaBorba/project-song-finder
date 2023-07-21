import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { SongType, AlbumType } from '../../types';
import Carregando from '../../components/Carregando';

function Album() {
  const [loading, setLoading] = useState(true);
  const [albumData, setAlbumData] = useState<AlbumType>();
  const [songs, setSongs] = useState<(AlbumType | SongType)[]>();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData = await getMusics(String(id));
        console.log('artistData', artistData);

        console.log('artistData[0]', artistData[0]);
        setAlbumData(artistData[0]);

        setSongs(artistData.slice(1));
        console.log('artistData.slice(1)', artistData.slice(1));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error('Erro, API não resolvida');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Carregando />
      ) : (
        <div>
          blabla
          {/* { albumData } */}
        </div>
      )}
    </div>
  );
}

export default Album;
