import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { NavLink } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongList from '../components/SongList';
import { CircularProgress, LinearProgress } from '@mui/material';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const clientId = 'cb38abd46aae40c7b4e866b90628e9bf';
    const clientSecret = '9a894c1772b94a038965643a18473a56';

    useEffect(() => {
        fetchAccessToken();
    }, []);

    useEffect(() => {
        if (accessToken != undefined) {
            onNewSearch();
        }
    }, [searchTerm, accessToken]);

    const fetchAccessToken = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
            });
            const data = await response.json();
            setAccessToken(data.access_token);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching access token: ', error);
            setLoading(false);
        }
    };
    const fetchSongs = async () => {
        try {
            var response
            if (searchTerm == "") {
                response = await fetch(`https://api.spotify.com/v1/browse/new-releases?offset=${offset}&limit=20`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
            }
            else {

                response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&offset=${offset}&limit=20`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })

            }
            return await response.json();

        } catch (error) {
            console.error('Error fetching tracks ', error);
        }
    }
    const onNewSearch = async () => {
        try {
            const data = await fetchSongs()
            if (data.tracks.items) {
                setSongs([...data.tracks.items]);
                setOffset(offset + 20);
            }
        }

        catch (error) {
            console.error('Error fetching tracks ', error);

        }
    }
    const fetchMore = async () => {
        try {
            const data = await fetchSongs()
            if (data.tracks.items) {
                setSongs([...songs, ...data.tracks.items]);
                setOffset(offset + 20);
            }
        }
        catch (error) {
            console.error('Error fetching more tracks ', error);
        }
    }

    return (
        <div >
            <SearchBar setSearchTerm={setSearchTerm} />
            <InfiniteScroll
                dataLength={songs.length}
                next={fetchMore}
                hasMore={true}
                loader={loading ? <LinearProgress /> : null}
            >
                <SongList songs={songs} />
            </InfiniteScroll>
        </div>
    );
}

export default Home;