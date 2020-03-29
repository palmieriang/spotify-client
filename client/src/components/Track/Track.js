import React from 'react';
import PropTypes from 'prop-types';
import './_track.scss';

const Track = ({ album, artists, name }) => {
    return (
        <div className="Track">
            <p>{name}</p>
            <p>{artists[0].name}</p>
            <p>{album.name}</p>
        </div>
    );
};

Track.propTypes = {
    album: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
    }),
    artists: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })).isRequired,
    name: PropTypes.string.isRequired,
};

Track.defaultProps = {
    album: {
        image: '',
        name: '',
    }
};

export default Track;
