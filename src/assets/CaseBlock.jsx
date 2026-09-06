import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CaseBlock.scss';

// 1. Импортируем все картинки (убедитесь, что папки названы строчными буквами)
import imgVizitka from './hotel-alta/print/prezentaciya-vizitki.png';
import imgMenu from './hotel-alta/print/menyu-obshee.png';
import imgFartuk from './hotel-alta/print/print-na-fartuke.png';
import imgDver from './hotel-alta/print/tablichka-na-dver.png';
import imgNav from './hotel-alta/print/prezentaciya-navigacii.png';
import imgNabor from './hotel-alta/print/prezentaciya-podarochnogo-nabora.png';

import imgVakansii from './hotel-alta/socials/banner-vakansii.png';
import imgReklama from './hotel-alta/socials/reklamniy-banner.png';
import imgKarusel1 from './hotel-alta/socials/karusel-1.png';
import imgKarusel2 from './hotel-alta/socials/karusel-2.png';
import imgKarusel3 from './hotel-alta/socials/karusel-3.png';
import imgKarusel4 from './hotel-alta/socials/karusel-4.png';
import imgKarusel5 from './hotel-alta/socials/karusel-5.png';
import imgKarusel6 from './hotel-alta/socials/karusel-6.png';
import imgBanner from './hotel-alta/socials/banner.png';
import imgBannerAdapt from './hotel-alta/socials/banner-adaptaciya.png';

// ─────────────────────────────────────────────
// Данные кейса (теперь используем переменные импортов)
// ─────────────────────────────────────────────
const caseImages = [
    { id: 1, img: imgVizitka, layout: 'half' },
    { id: 2, img: imgMenu, layout: 'half' },
    { id: 3, img: imgFartuk, layout: 'half' },
    { id: 4, img: imgDver, layout: 'half' },
    { id: 5, img: imgNav, layout: 'half' },
    { id: 6, img: imgNabor, layout: 'half' },
    { id: 7, img: imgVakansii, layout: 'half' },
    { id: 8, img: imgReklama, layout: 'half' },
    { id: 9, img: imgKarusel1, layout: 'half' },
    { id: 10, img: imgKarusel2, layout: 'half' },
    { id: 11, img: imgKarusel3, layout: 'half' },
    { id: 12, img: imgKarusel4, layout: 'half' },
    { id: 13, img: imgKarusel5, layout: 'half' },
    { id: 14, img: imgKarusel6, layout: 'half' },
    { id: 15, img: imgBanner, layout: 'half' },
    { id: 16, img: imgBannerAdapt, layout: 'half' },
];

// ─────────────────────────────────────────────────────────────────────────────
// CaseImageModal — картинка кейса открывается как модальное окно
// ─────────────────────────────────────────────────────────────────────────────
const CaseImageModal = ({ src, alt, onClose }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState('50% 50%');
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const startPosRef = useRef({ x: 0, y: 0 });
    const hasDraggedRef = useRef(false);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== 'Escape') return;
            if (isZoomed) {
                setIsZoomed(false);
                setTranslate({ x: 0, y: 0 });
            } else {
                onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isZoomed, onClose]);

    const handleMouseDown = (e) => {
        e.stopPropagation();
        if (e.button !== 0) return;
        if (isZoomed) {
            setIsDragging(true);
            hasDraggedRef.current = false;
            startPosRef.current = {
                x: e.clientX - translate.x,
                y: e.clientY - translate.y,
            };
        }
    };

    useEffect(() => {
        const onMove = (e) => {
            if (!isDragging) return;
            const dx = Math.abs(e.clientX - (startPosRef.current.x + translate.x));
            const dy = Math.abs(e.clientY - (startPosRef.current.y + translate.y));
            if (dx > 5 || dy > 5) hasDraggedRef.current = true;
            if (hasDraggedRef.current) {
                setTranslate({
                    x: e.clientX - startPosRef.current.x,
                    y: e.clientY - startPosRef.current.y,
                });
            }
        };
        const onUp = () => { if (isDragging) setIsDragging(false); };

        if (isDragging) {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [isDragging, translate]);

    const handleImgClick = (e) => {
        e.stopPropagation();
        if (hasDraggedRef.current) { hasDraggedRef.current = false; return; }

        if (isZoomed) {
            setIsZoomed(false);
            setTranslate({ x: 0, y: 0 });
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setTransformOrigin(`${x}% ${y}%`);
            setTranslate({ x: 0, y: 0 });
            setIsZoomed(true);
        }
    };

    const cursor = isDragging ? 'grabbing' : isZoomed ? 'zoom-out' : 'zoom-in';

    return (
        <div
            className="case-img-modal-overlay"
            onClick={() => { if (!isZoomed) onClose(); }}
        >
            <div
                className="case-img-modal-wrapper"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="case-img-modal-close"
                    onClick={onClose}
                    title="Закрыть"
                >
                    ×
                </button>

                <img
                    src={src}
                    alt={alt}
                    onClick={handleImgClick}
                    onMouseDown={handleMouseDown}
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                        cursor,
                        transform: isZoomed
                            ? `translate(${translate.x}px, ${translate.y}px) scale(3)`
                            : 'translate(0,0) scale(1)',
                        transformOrigin,
                        transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,1,0.5,1)',
                        maxWidth: '90vw',
                        maxHeight: '85vh',
                        objectFit: 'contain',
                        display: 'block',
                        userSelect: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                    }}
                />

                {isZoomed && (
                    <div className="case-img-modal-hint">
                        Перетащите мышью · Клик или Escape — уменьшить
                    </div>
                )}
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// Главный компонент CaseBlock
// ─────────────────────────────────────────────
const CaseBlock = () => {
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [scrollToImageId, setScrollToImageId] = useState(null);
    const [modalImage, setModalImage] = useState(null); 

    const fullscreenOverlayRef = useRef(null);
    const fullscreenContentRef = useRef(null);

    const handleOpenCase = useCallback((imageId = null) => {
        setIsFullscreenOpen(true);
        setScrollToImageId(imageId);
        setModalImage(null);
        document.body.classList.add('case-open');
    }, []);

    const closeFullscreen = useCallback(() => {
        if (modalImage) { setModalImage(null); return; }
        setIsFullscreenOpen(false);
        setScrollToImageId(null);
        document.body.classList.remove('case-open');
    }, [modalImage]);

    const handleOverlayClick = useCallback((e) => {
        if (e.target === fullscreenOverlayRef.current) closeFullscreen();
    }, [closeFullscreen]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isFullscreenOpen && !modalImage) closeFullscreen();
        };
        if (isFullscreenOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isFullscreenOpen, modalImage, closeFullscreen]);

    useEffect(() => {
        const overlay = fullscreenOverlayRef.current;
        if (!overlay || !isFullscreenOpen) return;
        const stopWheel = (e) => e.stopPropagation();
        overlay.addEventListener('wheel', stopWheel, { capture: true });
        return () => overlay.removeEventListener('wheel', stopWheel, { capture: true });
    }, [isFullscreenOpen]);

    useEffect(() => {
        if (isFullscreenOpen && scrollToImageId !== null) {
            setTimeout(() => {
                const el = document.getElementById(`case-image-${scrollToImageId}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }, [isFullscreenOpen, scrollToImageId]);

    useEffect(() => () => { document.body.classList.remove('case-open'); }, []);

    return (
        <>
            <div className="case-glass-block">
                <div className="case-header">
                    <div className="case-title-section">
                        <h3 className="case-subtitle">Кейс ALTA HOTEL</h3>
                        <p className="case-description">
                            [Social media, Digital banner, Print, Merch & Souvenir, Hotel campaign]
                        </p>
                    </div>
                    <button className="case-open-btn" onClick={() => handleOpenCase(null)}>
                        Открыть
                    </button>
                </div>

                <div className="case-preview-grid">
                    {caseImages.slice(0, 9).map((item) => (
                        <div
                            key={item.id}
                            className="case-preview-item"
                            onClick={() => handleOpenCase(item.id)}
                        >
                            <img src={item.img} alt={`Preview ${item.id}`} />
                        </div>
                    ))}
                </div>
            </div>

            {isFullscreenOpen && (
                <div
                    className="case-fullscreen-overlay"
                    ref={fullscreenOverlayRef}
                    onClick={handleOverlayClick}
                >
                    <div className="case-fullscreen-header">
                        <h2 className="case-fullscreen-title">Кейс ALTA HOTEL</h2>
                        <button
                            className="case-fullscreen-close"
                            onClick={closeFullscreen}
                            title="Закрыть"
                        >
                            ×
                        </button>
                    </div>

                    <div className="case-fullscreen-content" ref={fullscreenContentRef}>
                        {caseImages.map((item) => (
                            <div
                                key={item.id}
                                id={`case-image-${item.id}`}
                                className={`case-fullscreen-item ${item.layout}`}
                            >
                                <img
                                    src={item.img}
                                    alt={`Case image ${item.id}`}
                                    className="case-fullscreen-img"
                                    onClick={() => setModalImage({ src: item.img, alt: `Case image ${item.id}` })}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {modalImage && (
                <CaseImageModal
                    src={modalImage.src}
                    alt={modalImage.alt}
                    onClose={() => setModalImage(null)}
                />
            )}
        </>
    );
};

export default CaseBlock;