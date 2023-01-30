import {FormEvent, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
            <AlbumPicker></AlbumPicker>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

function AlbumPicker() {
    const [albums, setAlbums] = useState<string[]>([]);
    const [dates, setDates] = useState<string[]>([]);

    async function handleSubmitArtist(e: FormEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            artist: { value: string };

        };
        const artist = encodeURIComponent(target.artist.value)
        const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
        const response = await fetch(url);
        const mbResult = (await response.json()) as {
            releases: { title: string, date: string } [];
        };
        const {releases} = mbResult;
        setAlbums(releases.map(({title}) => title));
        setDates(releases.map(({date}) => date));


    }


    async function handleSubmitAlbum(e: FormEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            album: { value: string };

        };
        const album = encodeURIComponent(target.album.value);
        const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=release:${album}`;
        const response = await fetch(url);
        const mbResult = (await response.json()) as {
            releases: { title: string, date: string } [];
        };
        const {releases} = mbResult;
        setAlbums(releases.map(({title}) => title));
        setDates(releases.map(({date}) => date));
    }
        return (
            <div>
                <form onSubmit={handleSubmitArtist}>
                    <label>
                        Artist name:
                        <input name="artist"/>
                    </label>
                    <button type="submit">Search</button>
                    <p>Albums:</p>
                    <ol>
                        {albums.map((album) => (
                            <li>{album + " " + dates.at(albums.indexOf(album))}</li>
                        ))}
                    </ol>
                </form>



                <form onSubmit={handleSubmitAlbum}>
                    <label>
                        Artist name:
                        <input name="Album"/>
                    </label>
                    <button type="submit">Search</button>
                    <label>
                        Album name:
                        <input name="album"/>

                    </label>
                    <button type="submit">Search</button>
                    <p>Albums:</p>
                    <ol>
                        {albums.map((album) => (
                            <li>{album + " " + dates.at(albums.indexOf(album))}</li>
                        ))}
                    </ol>
                </form>
            </div>
        );


}
export default App
