import React from 'react';
import TracksList from './TrackList';
import { TrackItem } from './Models/track'; // Assuming path is correct

interface Tracks {
  items: TrackItem[];
}

interface SearchResultProps {
  result: {
    tracks: Tracks;
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const { tracks } = result;
  
  return (
    <React.Fragment>
      {tracks?.items && <TracksList tracks={tracks.items} />}
    </React.Fragment>
  );
};

export default SearchResult;
