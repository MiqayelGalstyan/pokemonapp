export interface IPokemon {
    name: string;
    url: string;
}


export interface IGetPokemonsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemon[];
}

export interface IPokemonDetails extends IPokemon {
    height: number;
    order: number;
    weight: number;
}