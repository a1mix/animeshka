import { Demographic } from "./Demographic";
import { Trailer } from "./Trailer";
import { IImageTypes } from "./IImageTypes";

export interface IAnime {
    mal_id:          number;
    url:             string;
    images:          IImageTypes;
    trailer:         Trailer;
    title:           string;
    type:            string;
    episodes:        number;
    status:          string;
    score:           number;
    synopsis:        string;
    year:            number;
    genres:          Demographic[];
}