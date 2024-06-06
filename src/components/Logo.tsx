import React from 'react';

const Logo = ({ nPattern }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '15vh',
            padding: '50px'
        }}>
            <img
                src={nPattern > 0 ? '../../resources/open_logo.png' : '../../resources/closed_logo.png'}
                alt="book"
                style={{
                    maxWidth: '250px',
                    maxHeight: '250px',
                    objectFit: 'contain',
                    margin: 'auto',
                    borderRadius: '10px'
                }}
            />
        </div>
    );
};

export default Logo;