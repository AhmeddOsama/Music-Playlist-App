
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, DialogTitle, List, Fab, Modal, Card, Box, Button, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { getPlaylists, addSongToPlaylist, getSelectedSong, removeSongFromPlaylist, setSelectedPlaylist } from '../redux/slices/playlistsSlice';
import { ListItemButton } from '@mui/material';
import AddNewPlaylist from './AddNewPlaylist';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SelectPlaylist(props) {
    const { onClose, selectedValue, open } = props;
    const playlists = useSelector(getPlaylists)
    const selectedSong = useSelector(getSelectedSong)
    const dispatch = useDispatch()
    const [addPlaylistDialogOpen, setAddPlaylistDialogOpen] = useState(false);
    const toggleAddPlaylist = () => {
        setAddPlaylistDialogOpen(!addPlaylistDialogOpen);
    };

    const handleClose = () => {
        onClose(selectedValue);
    };
    const isSongInPlayList = (playlist) => {
        if (selectedSong.id != undefined) {
            return playlist.songs.some((song) => song.id === selectedSong.id);

        }
        return false

    }
    const handleListItemClick = (playlist) => {
        dispatch(addSongToPlaylist(playlist))
    };

    const handleRemove = (playlist) => {
        dispatch(setSelectedPlaylist(playlist))
        dispatch(removeSongFromPlaylist())
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select Playlist</DialogTitle>
            <List>
                {playlists.map((playlist) => {
                    const exist = isSongInPlayList(playlist)
                    return <ListItem key={playlist.name} >
                        <ListItemButton disabled={exist} onClick={() => handleListItemClick(playlist)}>
                            <ListItemText primary={playlist.name} />
                        </ListItemButton>
                        <Fab style={{ display: exist ? 'inline-flex' : 'none' }} size='small' onClick={() => handleRemove(playlist)}>
                            <CheckCircleIcon></CheckCircleIcon>
                        </Fab>

                    </ListItem>
                })}
                <ListItem disableGutters style={{ textAlign: 'center' }}>
                    <ListItemButton
                        autoFocus
                        onClick={toggleAddPlaylist}

                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add playlist" />

                    </ListItemButton>
                </ListItem>
                <AddNewPlaylist
                    open={addPlaylistDialogOpen}
                    onClose={toggleAddPlaylist}
                />
            </List>

        </Dialog >
    );
}

export default SelectPlaylist