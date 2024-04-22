import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import './SelectedTrack.css';

const SelectedTrackDisplay: React.FC = () => {
  const track = useSelector((state: RootState) => state.tracks.selectedTrack);

  if (!track) return null;

  return (
    <div className="selected-track-container">
      <img src={track.album.images[0].url} alt={track.name} className="selected-track-image" />
      <p className="selected-track-text">{track.name} by {track.artists.map(artist => artist.name).join(", ")}</p>
    </div>
  );
};

export default SelectedTrackDisplay;
