import React from 'react';

import './loader.css';

const Preloader = () => {
    return(
        <div styleName="loader triangle">
            <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
        </div>
    )
};

export default Preloader;