import React from 'react';
import './MainLogo.css';
function MainLogo({ size }) {
    return (
        <div className=" MainLogo SCDream-r logo" style={{ fontSize: size }}>
            Interview.
            <span className="gradient_text" style={{ fontSize: size }}>
                Ai
            </span>
        </div>
    );
}

export default MainLogo;
