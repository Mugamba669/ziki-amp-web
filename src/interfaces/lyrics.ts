// To parse this data:
//
//   import { Convert, LyricsModel } from "./file";
//
//   const lyricsModel = Convert.toLyricsModel(json);

export interface LyricsModel {
    lyrics: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLyricsModel(json: string): LyricsModel {
        return JSON.parse(json);
    }

    public static lyricsModelToJson(value: LyricsModel): string {
        return JSON.stringify(value);
    }
}
