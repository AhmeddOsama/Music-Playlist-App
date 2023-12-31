import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ setSearchTerm }) => {
    const [text, setText] = useState('');

    const handleSearch = (text) => {
        setText(text)
        setSearchTerm(text);
    };

    return (
        <Grid style={{ padding: 10 }} container spacing={2} alignItems="center">
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Search for a song"
                    value={text}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                        style: {
                            color: 'white',
                            borderColor: 'white',
                            backgroundColor: '#333',
                            borderRadius: 20,

                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                />
            </Grid>

        </Grid>
    );
};

export default SearchBar;
