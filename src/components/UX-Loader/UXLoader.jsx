import React from 'react';
import './UXLoader.scss';
const UXLoader = props => {
    return (
        <div className={props.fullPageOverlay ? 'fullPageOverlay' : null}>
            <div className='loaderWrapper'>
                <div className='loader'></div>
            </div>
        </div>
    );
};

export default UXLoader;