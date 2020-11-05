import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'office-ui-fabric-react';
import { WorkoutContext } from '../../contexts';
import { DetailsListDocumentsExample } from './Songs';

function SongList(props: any) {
  const [songsList, setSongsList] = useState([]);
  const [playlistLink, setPlaylistLink] = useState('');
  const workoutContext = useContext(WorkoutContext);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/playlist?duration=${
        workoutContext.duration * 60 * 1000
      }&${
        !workoutContext.customFormat
          ? `defaultPattern=${workoutContext.format}`
          : `songsPattern=${workoutContext.customFormat}`
      }`
    ).then((response) => response.json().then((res) => setSongsList(res)));
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          const songids = songsList.map((song: any) => {
            return song.id;
          });

          fetch(
            `http://localhost:5000/api/addSongsToPlaylist?songIds=${songids.join()}`,
            { method: 'post' }
          ).then((response) =>
            response.json().then((res) => {
              console.log(res);
              setPlaylistLink(res.url);
            })
          );
        }}
      >
        Create Playlist
      </Button>
      <div className="song-list">
        {
          <DetailsListDocumentsExample
            songList={songsList}
            key={songsList.length}
          />
        }
      </div>
      {playlistLink !== '' && (
        <div>
          Playlist created. Click below
          <a href={playlistLink}>Link</a>
        </div>
      )}
    </>
  );
}

export default SongList;

// /{url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"}
// url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"
