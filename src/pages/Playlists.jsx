import React, { useEffect, useState } from "react";
import "./Playlists.css";
import { PLAYLISTS } from "../data/playlists";

// oEmbed endpoint yields { title, thumbnail_url, ... } with no API key.
// If it ever fails or CORS blocks in your env, we fall back to a static cover.
async function fetchOEmbed(playlistId) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/playlist?list=${encodeURIComponent(
    playlistId
  )}&format=json`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`oEmbed ${res.status}`);
  return res.json();
}

function PlaylistCard({ playlistId, fallbackCover }) {
  const [meta, setMeta] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchOEmbed(playlistId);
        if (active) setMeta(data);
      } catch (e) {
        if (active) setErr(e);
      }
    })();
    return () => {
      active = false;
    };
  }, [playlistId]);

  const href = `https://www.youtube.com/playlist?list=${playlistId}`;
  const title =
    meta?.title ||
    `YouTube Playlist (${playlistId.slice(0, 8)}…)`;
  const thumb =
    meta?.thumbnail_url || fallbackCover || "/covers/playlist-fallback.jpg";

  return (
    <a
      className="playlist-card"
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      <img
        loading="lazy"
        src={thumb}
        alt={title}
        className="playlist-thumb"
      />
      <div className="playlist-meta">
        <div className="playlist-title">{title}</div>
        <div className="playlist-id">{playlistId}</div>
      </div>
    </a>
  );
}

export default function Playlists() {
  return (
    <div className="playlists-page">
      <h1 className="playlists-title">Playlists</h1>
      <div className="playlists-container">
        {Object.entries(PLAYLISTS).map(([genre, ids]) => (
          <section className="playlist-group" key={genre}>
            <h2 className="playlist-genre">{genre}</h2>
            <div className="playlist-list">
              {ids.map((pid) => (
                <PlaylistCard
                  key={pid}
                  playlistId={pid}
                  // Optional per-genre fallback cover:
                  fallbackCover={`/covers/${genre.replace(/\s+/g, "-").toLowerCase()}.jpg`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
