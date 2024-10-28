import { Backdrop, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IGetPokemonsResponse, IPokemon } from './types/pokemon.interface';
import Pokemon from './Pokemon';
import PaginationControls from './Pagination';
import { useTheme } from '@mui/material/styles';
import CustomModal from './Modal';

const limit = 20;

const PokemonList = () => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [activePage, setActivePage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);

    const theme = useTheme();

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const offset = activePage * limit;
            const fetchPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const response: IGetPokemonsResponse = await fetchPokemons.json();
            setNextPageUrl(response.next);
            setPrevPageUrl(response.previous)
            setTotalCount(response.count);
            setPokemons(response.results);
        } catch (error) {
            console.log(error, 'fetchError')
        }
        finally {
            setLoading(false);
        }
    }


    const fetchPokemonDetails = async (url: string) => {
        try {
            setLoading(true);
            const fetchPokemon = await fetch(`${url}`);
            const response: IPokemon = await fetchPokemon.json();
            setSelectedPokemon(response);
            setModalOpen(true);
        } catch (error) {
            console.log(error, 'error')
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchPokemons();
    }, [activePage])

    const onModalClose = () => {
        setModalOpen(false);
        setSelectedPokemon(null);
    }

    return (
        <>
            {loading && (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backdropFilter: 'blur(6px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    open
                >
                    <CircularProgress sx={{
                        color: theme.palette.grey['700'],
                    }} />
                </Backdrop>
            )}

            <Box sx={{ padding: '0 2%' }}>
                {pokemons.map((pokemon: IPokemon, index: number) => (
                    <Pokemon pokemon={pokemon} key={index} onPokemonClick={(url) => {
                        fetchPokemonDetails(url);
                    }} />
                ))}
                <PaginationControls activePage={activePage}
                    limit={limit}
                    totalCount={totalCount}
                    prevPageUrl={prevPageUrl}
                    nextPageUrl={nextPageUrl}
                    onPageChange={(page) => setActivePage(page - 1)}
                    onNextPageClick={() => setActivePage(prevState => prevState + 1)}
                    onPrevPageClick={() => setActivePage(prevState => prevState - 1)}
                />
                <CustomModal onClose={onModalClose} open={modalOpen}>

                    {selectedPokemon && (
                        <Card sx={{
                            margin: '20px auto 20px',
                            maxWidth: 500,
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'white'
                        }}>
                            <Button onClick={onModalClose}>X</Button>
                            <CardActionArea >
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={`https://img.pokemondb.net/artwork/large/${selectedPokemon.name}.jpg`}
                                        alt={selectedPokemon.name || ''}
                                    />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {selectedPokemon.name || ""}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                </CustomModal>
            </Box>
        </>
    )
}

export default PokemonList;