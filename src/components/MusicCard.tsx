type SongCardProps = {
  previewUrl: string,
  trackName: string,
};

function MusicCard({ trackName, previewUrl }:SongCardProps) {
  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}

export default MusicCard;
