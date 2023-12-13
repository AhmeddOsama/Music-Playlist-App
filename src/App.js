import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import SimpleAppBar from "./components/SimpleAppBar";
import Home from './pages/home';
import PlaylistsScreen from "./pages/PlaylistsScreen";

function App() {
  return (
    <BrowserRouter>
      <SimpleAppBar>
      </SimpleAppBar>
      <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<PlaylistsScreen />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
