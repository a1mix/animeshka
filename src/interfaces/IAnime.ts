import { Demographic } from "./Demographic";
import { Trailer } from "./Trailer";
import { ImageTypes } from "./ImageTypes";
import { Streaming } from "./Streaming";

export interface IAnime {
  mal_id: number;
  url: string;
  images: ImageTypes;
  trailer: Trailer;
  title: string;
  type: string;
  episodes: number;
  status: string;
  score: number;
  synopsis: string;
  year: number;
  genres: Demographic[];
  streaming: Streaming[];
}