import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { SongType, AlbumType } from '../../types';
import Carregando from '../../components/Carregando';

function Album() {
  const [loading, setLoading] = useState(true);
  const [albumData, setAlbumData] = useState<AlbumType>();
  const [songs, setSongs] = useState<(AlbumType | SongType)[]>();
  const { id } = useParams<{ id:string }>();
  console.log('id', id);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      const artistData = await getMusics(id as string);
      const [albumData, ...musicListData] = albumData;

      console.log('artistData', artistData);

      console.log('artistData[0]', artistData[0]);
      setAlbumData(artistData[0]);

      setSongs(artistData.slice(1));
      console.log('artistData.slice(1)', artistData.slice(1));

      setLoading(false);
      // } catch (error) {
      //   setLoading(false);
      //   throw new Error('Erro, API não resolvida');
      // }
    };

    fetchData();
  }, [id]);

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
