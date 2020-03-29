import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Track from '../Track/Track';

import './_nowPlaying.scss';

const NowPlaying = ({ album, artists, name }) => {
    return (
        <Fragment>
            <h2>Current song</h2>
            <div className="NowPlaying">
                <div>
                    <img src={ album.image } alt="" style={{width: 100}} />
                </div>
                <Track album={album} artists={artists} name={name} />
            </div>
        </Fragment>
    );
};

NowPlaying.propTypes = {
    album: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
    }),
    artists: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })).isRequired,
    name: PropTypes.string.isRequired,
};

NowPlaying.defaultProps = {
    album: {
        image: '',
        name: '',
    }
};

export default NowPlaying;
