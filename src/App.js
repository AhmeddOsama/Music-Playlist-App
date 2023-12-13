import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import SimpleAppBar from "./components/SimpleAppBar";
import Home from './pages/home';
import PlaylistsScreen from "./pages/PlaylistsScreen";
import SelectedPlaylistScreen from "./pages/SelectedPlaylistScreen";

function App() {
  return (
    <BrowserRouter>
      <SimpleAppBar>
      </SimpleAppBar>
      <div style={{ paddingTop: 80, background: 'linear-gradient(to bottom, #000000, #333333)', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<PlaylistsScreen />}></Route>
          <Route path="/playlists/:playlistName" element={<SelectedPlaylistScreen />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
