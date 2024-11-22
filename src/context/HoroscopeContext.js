import React, { createContext, useState } from 'react';

const HoroscopeContext = createContext(null);

// Define the provider
const HoroscopeProvider = ({ children }) => {
  const [horoscope, setHoroscope] = useState({});
  const [songs, setSongs] = useState({});
  const [horoscopeFlag, setHoroscopeFlag] = useState(false);
  const [songsFlag, setSongsFlag] = useState(false);
  const [sunSign, setSunSign] = useState("");
  const [docRef, setDocRef] = useState("");
  const [movies, setMovies] = useState({});
  const [books, setBooks] = useState({});
  const [sentimentResult, setSentimentResult] = useState(null);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  return (
    <HoroscopeContext.Provider
      value={{
        horoscope,
        setHoroscope,
        songs,
        setSongs,
        horoscopeFlag,
        setHoroscopeFlag,
        songsFlag,
        setSongsFlag,
        sunSign,
        setSunSign,
        docRef,
        setDocRef,
        movies,
        setMovies,
        books,
        setBooks,
        sentimentResult,
        setSentimentResult,
        favoriteSongs, 
        setFavoriteSongs,
        favoriteMovies, 
        setFavoriteMovies,
        favoriteBooks, 
        setFavoriteBooks
      }}
    >
      {children}
    </HoroscopeContext.Provider>
  );
};

export { HoroscopeContext, HoroscopeProvider };
