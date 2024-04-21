import React from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import _ from 'lodash';
import { TrackItem } from './Models/track'; // Assuming path is correct

interface TracksListProps {
  tracks: TrackItem[];
}

const TracksList: React.FC<TracksListProps> = ({ tracks }) => {
  return (
    <div style={{ overflowY: 'auto', height: '80vh' }}> {/* Scrollable list container */}
      <ListGroup>
        {tracks.map((track, index) => (
          <ListGroup.Item key={index} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: '10px' }}
            >
              {track.album.images.length > 0 ? (
                <Image src={track.album.images[0].url} alt={track.name} rounded style={{ width: '60px', height: '60px' }} />
              ) : (
                <div className="image-placeholder" style={{ width: '60px', height: '60px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.8em' }}>No Image</span>
                </div>
              )}
            </a>
            <div>
              <div style={{ fontWeight: 'bold' }}>{track.name}</div>
              <div style={{ fontSize: '0.85em', color: '#666' }}>
                {track.artists.map((artist, idx, arr) => (
                  <span key={idx}>{artist.name}{idx + 1 < arr.length ? ', ' : ''}</span>
                ))}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TracksList;
