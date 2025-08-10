import React from 'react';
import './Playlists.css';

const playlists = {
  Metal: ['CD-E-LDc384', 'tAGnKpE4NCI', 'EOnSh3QlpbQ', 'DnGdoEa1tPg'],
  'Electronic Atmospheric': ['HLzC2N4PeT4', 'jWO9bZr5tUw', '6qU2t1dG6nc', 'VpIvtzSJG0o'],
  Rap: ['eJO5HU_7_1w', 'tvTRZJ-4EyI', 'E_2PfPhRJgU', 'M3mJkSqZbX4'],
  Classical: ['jgpJVI3tDbY', 'RR2T6-Mz8jI', 'k1Fy5_yT3M8', '9E6b3swbnWg'],
};

const Playlists = () => {
  return (
    <div className="playlists-page">
      <h1 className="playlists-title">Playlists</h1>
      <div className="playlists-container">
        {Object.entries(playlists).map(([genre, videos]) => (
          <div className="playlist" key={genre}>
            <h2 className="playlist-genre">{genre}</h2>
            <div className="videos-scroll">
              {videos.map((id) => (
                <a
                  key={id}
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${id}/0.jpg`}
                    alt="YouTube thumbnail"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;

