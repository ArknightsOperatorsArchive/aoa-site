interface HighlightResult {
  value: string;
  matchLevel: "none" | "full";
  matchedWords: string[];
  fullyHighlighted?: boolean;
}

interface ArtistQueryResponse {
  hits: {
    "artist.displayName": string;
    "operator.name": string;
    "operator.class": string;
    lastmodified: number;
    "operator.uid": string;
    "artist.uid": string;
    objectID: string;
    _highlightResult: {
      "artist.displayName": HighlightResult;
      "operator.name": HighlightResult;
      "operator.class": HighlightResult;
    };
  }[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  renderingContent: any;
  processingTimeMS: number;
}

export default ArtistQueryResponse;
