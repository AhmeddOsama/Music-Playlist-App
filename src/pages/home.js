import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [accessToken, setAccessToken] = useState();

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
                response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
            }
            else {

                response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })

            }
            const data = await response.json();
            console.log('data ', data.tracks.items)
            if (data.tracks.items) {
                setSongs(data.tracks.items);
            }
        } catch (error) {
            console.error('Error fetching tracks ', error);
        }
    };

    return (
        <div>
            <SearchBar setSearchTerm={setSearchTerm} onSearch={handleSearch} />
            <SongList songs={songs} />
        </div>
    );
}

export default Home;