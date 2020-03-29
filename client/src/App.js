import React, { Component } from 'react';
import './App.scss';
import Spotify from 'spotify-web-api-js';
import NowPlaying from './components/NowPlaying/NowPlaying';
import Playlist from './components/Playlist/Playlist';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: '',
        album: {
          image: '',
          name: '',
        },
        artists: [
          {
            name: '',
          }
        ],
      },
      tracks: [],
    }

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }

    if (this.state.loggedIn) {
      this.getNowPlaying();
      this.getPlaylist();
    }

    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then(response => {
        console.info('now playing', response.item);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            album: {
              image: response.item.album.images[0].url,
              name: response.item.album.name,
            },
            artists: [
              {
                name: response.item.artists[0].name,
              }
            ],
          },
        })
      })
      .catch(err => console.log(err));
  }

  getPlaylist() {
    const playlist_id = '2jCZVOmNFkreAlk78GyZ5s';
    spotifyWebApi.getPlaylist(playlist_id)
      .then(response => {
        this.setState({
          tracks: response.tracks.items,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loggedIn, nowPlaying, tracks } = this.state;
    return (
      <div className="App">
        {!loggedIn ? 
          <a className="Cta" href="http://localhost:8888">
            Login with Spotify
          </a>
        :
          <button className="Cta" onClick={this.getNowPlaying}>
            Check now playing
          </button>
        }

        {nowPlaying.name && <NowPlaying {...nowPlaying} />}

        {tracks.length > 0 && <Playlist tracks={tracks} />}
      </div>
    );
  }
}

export default App;
