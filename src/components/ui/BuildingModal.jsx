import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BuildingModal({ config, onClose, onEnter }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    if (!config) return null;

    const overlayStyle = {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(4px)'
    };

    const cardStyle = {
        position: 'relative',
        width: '90vw',
        maxWidth: '560px',
        background: '#ffffff',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        borderRadius: '32px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden'
    };

    const iconBoxStyle = {
        width: '120px',
        height: '120px',
        fontSize: '64px',
        margin: '0 auto 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #34d399, #10b981, #14b8a6)'
    };

    const primaryButtonStyle = {
        width: '100%',
        padding: '18px 24px',
        fontSize: '17px',
        fontWeight: 'bold',
        color: 'white',
        background: 'linear-gradient(to right, #3b82f6, #2563eb)',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer'
    };

    const secondaryButtonStyle = {
        width: '100%',
        padding: '18px 24px',
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#334155',
        background: '#e2e8f0',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer',
        marginTop: '12px'
    };

    const closeButtonStyle = {
        position: 'absolute',
        right: '20px',
        top: '20px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: '#f1f5f9',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b'
    };

    const modal = (
        <div style={overlayStyle} onClick={onClose}>
            <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: '48px 32px 24px', textAlign: 'center' }}>
                    <div style={iconBoxStyle}>
                        <span>{config.icon || "🏢"}</span>
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                        {config.name}
                    </h2>
                    <p style={{ marginTop: '12px', fontSize: '15px', color: '#64748b', lineHeight: 1.6 }}>
                        {config.description}
                    </p>
                </div>

                <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                <div style={{ padding: '0 32px 32px' }}>
                    {config.canEnter ? (
                        <button style={primaryButtonStyle} onClick={onEnter}>
                            Enter {config.name}
                        </button>
                    ) : (
                        <div style={{ ...primaryButtonStyle, background: '#cbd5e1', color: '#94a3b8', cursor: 'not-allowed' }}>
                            Locked
                        </div>
                    )}
                    <button style={secondaryButtonStyle} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    if (typeof document !== 'undefined') return createPortal(modal, document.body);
    return modal;
}
