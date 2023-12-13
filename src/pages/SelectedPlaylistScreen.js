import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedPlaylist, setSelectedPlaylist } from '../redux/slices/playlistsSlice';
import SongDetails from '../components/SongDetails';
import { Typography, Button, Input, Avatar, Grid } from '@mui/material';
import SongList from '../components/SongList';

const SelectedPlaylistScreen = () => {
    const dispatch = useDispatch();
    const selectedPlaylist = useSelector(getSelectedPlaylist);
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // You can handle the file as needed, for example, store it in state
        setImage(file);
    };

    useEffect(() => {
        console.log('hi');
    }, [selectedPlaylist]);

    if (!selectedPlaylist || !selectedPlaylist.songs || selectedPlaylist.songs.length === 0) {
        return null;
    }

    return (
        <div style={{ padding: 10 }}>
            {selectedPlaylist && (<>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="image-upload">
                            <Avatar
                                alt="Playlist Cover"
                                src={image ? URL.createObjectURL(image) : '/default-image.png'}
                                sx={{ width: 100, height: 100, cursor: 'pointer' }}
                            />
                        </label>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4" style={{ color: 'white' }}>
                            {selectedPlaylist.name}
                        </Typography>
                    </Grid>
                </Grid>
                <SongList songs={selectedPlaylist.songs} />
            </>
            )}

        </div>
    );
};

export default SelectedPlaylistScreen;
