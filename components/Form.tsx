"use client";
import { useState } from "react";

interface Playlist {
  author: string;
  artist: string;
  genre: string;
  name: string;
}

export default function Form() {
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [author, setAuthor] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<{msg: string, isError: boolean}>();

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.length || !artist.length || !author.length || !genre.length) {
      setError({msg: "Field is not empty", isError: true})
      return;
    }
    const data = {
      artist,
      author,
      name,
      genre,
    };
    console.log(data);
  
    setPlaylist([data]);
    handleReset();
    e.target.reset();
  };

  const handleReset = () => {
    setAuthor("");
    setArtist("");
    setGenre("");
    setName("");
    setError(undefined);
  };

  return (
    <div className="w-full flex flex-col">
      <form className="w-full m-2 p-2 flex flex-col place-content-between" onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="name" className="m-2 p-2">
          <span>Назва пісні</span>
          <input className="w-full text-black" id="name" onChange={e => setName(e.target.value)} />
        </label>
        
        <label htmlFor="author" className="m-2 p-2">
          <span>Автор</span>
          <input className="w-full text-black" type="text" id="author" onChange={e => setAuthor(e.target.value)}/>
        </label>
        
        <label htmlFor="artist" className="m-2 p-2">
          <span>Виконавець</span>
          <input className="w-full text-black" type="text" id="artist" onChange={e => setArtist(e.target.value)}/>
        </label>
        
        <label htmlFor="genre" className="m-2 p-2">
          <span>Жанр</span>
          <select className="w-full text-black" name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
            <option value="pop">Pop</option>
            <option value="rok">Rrok</option>
            <option value="jas">Jas</option>
            <option value="cantri">Cantri</option>
            <option value="indi">Indi</option>
          </select>
        </label>
        
        <div className="flex flex-row place-content-around p-2">
          <button type="submit" disabled={error?.isError || !name.length || !artist.length || !author.length || !genre.length}>
            Save
            </button>
          <button type="reset">Reset</button>
        </div>
      </form>
      <ul id="playlist" className="text-white">
        {playlist && playlist.map((item: Playlist, key: number) => (
          <li key={key}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}