import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Track from './../Track/Track';

const Playlist = ({ tracks }) => {
    console.log('tracks', tracks);
    return (
        <Fragment>
            <h2>Playlist</h2>
            <div className="Playlist">
                {tracks.map((track, index) => (
                    <Track {...track.track} key={index} />
                ))}
            </div>
        </Fragment>
    );
};

Playlist.propTypes = {
    tracks: PropTypes.array,
};

Playlist.defaultProps = {
    tracks: [],
};

export default Playlist;
