import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { IPokemon } from './types/pokemon.interface';
import { CardMedia } from '@mui/material';


interface IPokemonProps {
    pokemon: IPokemon;
    onPokemonClick: (pokemonUrl: string) => void;
}

const Pokemon: FC<IPokemonProps> = ({ pokemon, onPokemonClick }) => {
    return (
        <Card sx={{ maxWidth: 500, mb: 2, mt: 2 }}>
            <CardActionArea onClick={() => onPokemonClick(pokemon.url)}>
                <CardContent>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                        alt={pokemon.name}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Pokemon;