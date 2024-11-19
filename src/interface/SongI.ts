export interface SongDataI {
  id: number;
  singer: string;
  song: string;
  highest_pitch: number;
  lowest_pitch: number;
  gender: number;
  youtube_url: string;
  youtube_image: string;
  youtube_listen_url: string;
}

export interface SongI {
  singer: string;
  song: string;
  high: number;
  low: number;
  image: string;
  url: {
    listen: string;
    sing: string;
  };
}
