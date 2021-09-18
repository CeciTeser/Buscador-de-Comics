class PagedResponse {
    offset: number;
    limit: number;
    total: number;
    constructor(offset: number, limit: number, total: number) {
        this.offset = offset;
        this.limit = limit;
        this.total = total;
    }
}

class Character {
    id: number;
    name: string;
    description?: string;
    thumbnailUrl: string;
}

class CharactersResponse extends PagedResponse {
    characters: [Character];
    constructor(characters: [Character], offset: number, limit: number, total: number) {
        super(offset, limit, total);
        this.characters = characters;
    }
}

class Comic {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    modified: Date;
    creators: [string];
}

class ComicsResponse extends PagedResponse  {
    comics: [Comic];
    constructor(comics: [Comic], offset: number, limit: number, total: number) {
        super(offset, limit, total);
        this.comics = comics;
    }
}