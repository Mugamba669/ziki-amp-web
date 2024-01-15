// To parse this data:
//
//   import { Convert, Hot100 } from "./file";
//
//   const hot100 = Convert.toHot100(json);

export interface Hot100 {
    songs: SongMetaData[];
}

export interface SongMetaData {
    title: string;
    artist: string;
    artWork: string;
    url: string;
}

// Converts JSON strings to/from your types
export class ConvertHot100 {
    public static toHot100(json: string): Hot100 {
        return JSON.parse(json);
    }

    public static hot100ToJson(value: Hot100): string {
        return JSON.stringify(value);
    }
}
