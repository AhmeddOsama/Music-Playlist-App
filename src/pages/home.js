import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { NavLink } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongList from '../components/SongList';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [offset, setOffset] = useState(0);

    const clientId = 'cb38abd46aae40c7b4e866b90628e9bf';
    const clientSecret = '9a894c1772b94a038965643a18473a56';

    useEffect(() => {
        fetchAccessToken();
    }, []);

    useEffect(() => {
        console.log('search term ', searchTerm)
        if (accessToken != undefined) {
            handleSearch();

        }
    }, [searchTerm, accessToken]);

    const fetchAccessToken = async () => {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
            });
            const data = await response.json();
            setAccessToken(data.access_token);
        } catch (error) {
            console.error('Error fetching access token: ', error);
        }
    };

    const handleSearch = async () => {
        try {
            var response
            if (searchTerm == '') {
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
            const data = await response.json();
            if (data.tracks.items) {
                setSongs([...songs, ...data.tracks.items]);
                setOffset(offset + 20);
            }
        } catch (error) {
            console.error('Error fetching tracks ', error);
        }
    };

    return (
        <div>
            <SearchBar setSearchTerm={setSearchTerm} onSearch={handleSearch} />
            <InfiniteScroll
                dataLength={songs.length}
                next={handleSearch}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <SongList songs={songs} />
            </InfiniteScroll>
        </div>
    );
}

export default Home;