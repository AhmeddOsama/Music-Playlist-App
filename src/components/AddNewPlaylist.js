import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPlaylist, getPlaylists } from '../redux/slices/playlistsSlice';

const AddNewPlaylist = ({ open, onClose }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [valid, setValid] = useState(true);

    const playlists = useSelector(getPlaylists)
    const dispatch = useDispatch()
    const handleInputChange = (event) => {
        setPlaylistName(event.target.value);
        isValiidName(event.target.value)
};
    const isValiidName = (name) => {
        setValid(playlists.some((playlist) => playlist.name === name))
    }
    const handleSubmit = () => {
        dispatch(addNewPlaylist(playlistName))
        setPlaylistName('')
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the name for your new playlist:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="playlistName"
                    label="Playlist Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={playlistName}
                    onChange={handleInputChange}
                    error={valid}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create Playlist</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddNewPlaylist;
