import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Fab, Modal, Card, Box, Button } from '@material-ui/core';
import SelectPlaylist from './SelectPlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedPlaylist, setSelectedSong } from '../redux/slices/playlistsSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import RemoveFromPlaylist from './RemoveFromPlaylist';

const SongDetails = ({ song }) => {
    const trackDurationInMs = song.duration_ms;
    const minutes = Math.floor(trackDurationInMs / 60000);
    const seconds = ((trackDurationInMs % 60000) / 1000).toFixed(0);
    const selectedPlaylist = useSelector(getSelectedPlaylist)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [removeFromPlaylist, setRemoveFromPlaylist] = useState(false)
    const dispatch = useDispatch()
    const toggleRemoveFromPlaylist = () => {
        setRemoveFromPlaylist(!removeFromPlaylist)
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }


    const onAddToPlaylist = () => {
        dispatch(setSelectedSong(song))
        toggleModal()
    }
    const onRemoveFromPlaylist = () => {
        dispatch(setSelectedSong(song))
        toggleRemoveFromPlaylist()
    }

    return (
        <Paper style={{ padding: 16, marginBottom: 16, background: 'linear-gradient(to bottom, #000000, #333333)' }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Typography style={{ color: 'white' }} >{song.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ color: 'white' }} >{song.artists.map((artist) => artist.name).join(', ')}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ color: 'white' }} >{song.album.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ color: 'white' }} >{minutes}:{seconds.padStart(2, '0')}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Fab onClick={onAddToPlaylist} size="small" color="secondary" aria-label="add">
                        +
                    </Fab>
                </Grid>
                {selectedPlaylist.name != undefined && (<Grid item xs={2}>
                    <Fab onClick={onRemoveFromPlaylist} size="small" color="secondary" aria-label="remove">
                        -
                    </Fab>
                </Grid>)}
            </Grid>
            <SelectPlaylist
                selectedValue={''}
                open={isModalOpen}
                onClose={toggleModal}
            ></SelectPlaylist>
            <RemoveFromPlaylist onClose={toggleRemoveFromPlaylist} open={removeFromPlaylist}>
            </RemoveFromPlaylist>
        </Paper >
    );
};

export default SongDetails;