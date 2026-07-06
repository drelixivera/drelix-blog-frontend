import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto border-top border-secondary border-opacity-25 py-4 text-center"
        style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)' }}
        >
            <div className='container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-light text-opacity-50 small'>
                {/* Left Side: Brand Copyright */}
                <div>
                    &copy; {new Date().getFullYear()} <span className="text-white fw-semibold">DrelixBlog</span>. All rights reserved.
                </div>

                {/* Right Side: Social Media Channels */}
                <div className="d-flex align-items-center gap-3">
                    <span className="text-light text-opacity-40">
                        Follow the build:
                    </span>
                    <a 
                        href="https://x.com/drelixivera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none transition-all d-flex align-items-center gap-1"
                        style={{ color: '#38bdf8' }}
                        onMouseEnter={(e) => e.target.style.color = '#818cf8'}
                        onMouseLeave={(e) => e.target.style.color = '#38bdf8'}
                    >
                        <i className="bi bi-twitter-x"></i> @drelixivera
                    </a>
                </div>
            </div>
        </footer>
    )
};
export default Footer;