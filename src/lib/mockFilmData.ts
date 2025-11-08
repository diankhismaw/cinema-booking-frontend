interface FilmStudioInfo {
  film_name: string;
  theater_name: string;
  poster_url: string;
}

export const mockFilmData: { [key: string | number]: FilmStudioInfo } = {
  1: { film_name: "Avatar: The Way of Water", theater_name: "Cinema XXI", poster_url: "/poster/avatar.jpg" },
  2: { film_name: "The Avengers", theater_name: "CGV", poster_url: "/poster/avengers.jpeg" },
  3: { film_name: "Joker", theater_name: "Cinepolis", poster_url: "/poster/joker.webp" },
  4: { film_name: "Interstellar", theater_name: "Cinema XXI", poster_url: "/poster/interstellar.jpeg" },
  5: { film_name: "Now You See Me", theater_name: "CGV", poster_url: "/poster/now-you-see-me.jpg" },
};