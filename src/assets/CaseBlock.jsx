import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CaseBlock.scss';

// ─────────────────────────────────────────────
// Данные кейса
// ─────────────────────────────────────────────
const caseImages = [
    { id: 1, img: '/assets/Hotel-alta/Print/prezentaciya-vizitki.png', layout: 'half' },
    { id: 2, img: '/assets/Hotel-alta/Print/menyu-obshee.png', layout: 'half' },
    { id: 3, img: '/assets/Hotel-alta/Print/print-na-fartuke.png', layout: 'half' },
    { id: 4, img: '/assets/Hotel-alta/Print/tablichka-na-dver.png', layout: 'half' },
    { id: 5, img: '/assets/Hotel-alta/Print/prezentaciya-navigacii.png', layout: 'half' },
    { id: 6, img: '/assets/Hotel-alta/Print/prezentaciya-podarochnogo-nabora.png', layout: 'half' },
    { id: 7, img: '/assets/Hotel-alta/Socials/banner-vakansii.png', layout: 'half' },
    { id: 8, img: '/assets/Hotel-alta/Socials/reklamniy-banner.png', layout: 'half' },
    { id: 9, img: '/assets/Hotel-alta/Socials/karusel-1.png', layout: 'half' },
    { id: 10, img: '/assets/Hotel-alta/Socials/karusel-2.png', layout: 'half' },
    { id: 11, img: '/assets/Hotel-alta/Socials/karusel-3.png', layout: 'half' },
    { id: 12, img: '/assets/Hotel-alta/Socials/karusel-4.png', layout: 'half' },
    { id: 13, img: '/assets/Hotel-alta/Socials/karusel-5.png', layout: 'half' },
    { id: 14, img: '/assets/Hotel-alta/Socials/karusel-6.png', layout: 'half' },
    { id: 15, img: '/assets/Hotel-alta/Socials/banner.png', layout: 'half' },
    { id: 16, img: '/assets/Hotel-alta/Socials/banner-adaptaciya.png', layout: 'half' },
];

// ─────────────────────────────────────────────────────────────────────────────
// CaseImageModal — картинка кейса открывается как модальное окно
// с зумом / перетаскиванием (точная копия поведения ZoomableImage из App.jsx)
// ─────────────────────────────────────────────────────────────────────────────
const CaseImageModal = ({ src, alt, onClose }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState('50% 50%');
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const startPosRef = useRef({ x: 0, y: 0 });
    const hasDraggedRef = useRef(false);

    // Escape — сначала сбрасываем зум, потом закрываем
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

    // Зажатие ЛКМ — начало drag
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

    // Drag move / up — глобальные обработчики
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

    // Клик по картинке — зум / раззум
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
        /* Клик по фону — закрыть (только если не зумировано) */
        <div
            className="case-img-modal-overlay"
            onClick={() => { if (!isZoomed) onClose(); }}
        >
            <div
                className="case-img-modal-wrapper"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Кнопка закрытия */}
                <button
                    className="case-img-modal-close"
                    onClick={onClose}
                    title="Закрыть"
                >
                    ×
                </button>

                {/* Сама картинка */}
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
    // Картинка, открытая как модалка внутри кейса
    const [modalImage, setModalImage] = useState(null); // { src, alt }

    const fullscreenOverlayRef = useRef(null);
    const fullscreenContentRef = useRef(null);

    // ── Открытие полноэкранного кейса ──
    const handleOpenCase = useCallback((imageId = null) => {
        setIsFullscreenOpen(true);
        setScrollToImageId(imageId);
        setModalImage(null);
        document.body.classList.add('case-open');
    }, []);

    // ── Закрытие полноэкранного кейса ──
    const closeFullscreen = useCallback(() => {
        // Если открыта модалка картинки — закрываем только её
        if (modalImage) { setModalImage(null); return; }
        setIsFullscreenOpen(false);
        setScrollToImageId(null);
        document.body.classList.remove('case-open');
    }, [modalImage]);

    // ── Клик по оверлею кейса — только если попали ровно в него ──
    const handleOverlayClick = useCallback((e) => {
        if (e.target === fullscreenOverlayRef.current) closeFullscreen();
    }, [closeFullscreen]);

    // ── Escape ──
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isFullscreenOpen && !modalImage) closeFullscreen();
        };
        if (isFullscreenOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isFullscreenOpen, modalImage, closeFullscreen]);

    // ── Блокируем wheel-событие внутри оверлея (snap-scroll портфолио не перехватывает) ──
    useEffect(() => {
        const overlay = fullscreenOverlayRef.current;
        if (!overlay || !isFullscreenOpen) return;
        const stopWheel = (e) => e.stopPropagation();
        overlay.addEventListener('wheel', stopWheel, { capture: true });
        return () => overlay.removeEventListener('wheel', stopWheel, { capture: true });
    }, [isFullscreenOpen]);

    // ── Прокрутка к выбранному изображению ──
    useEffect(() => {
        if (isFullscreenOpen && scrollToImageId !== null) {
            setTimeout(() => {
                const el = document.getElementById(`case-image-${scrollToImageId}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }, [isFullscreenOpen, scrollToImageId]);

    // ── Cleanup ──
    useEffect(() => () => { document.body.classList.remove('case-open'); }, []);

    return (
        <>
            {/* ── Стеклянный блок с превью ── */}
            <div className="case-glass-block">

                {/* ФИХ 3: заголовок по центру */}
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

                {/* Превью-мозаика: первые 6 картинок */}
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

            {/* ── Полноэкранный просмотр ── */}
            {isFullscreenOpen && (
                <div
                    className="case-fullscreen-overlay"
                    ref={fullscreenOverlayRef}
                    onClick={handleOverlayClick}
                >
                    {/* Шапка */}
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

                    {/* Список картинок */}
                    <div className="case-fullscreen-content" ref={fullscreenContentRef}>
                        {caseImages.map((item) => (
                            <div
                                key={item.id}
                                id={`case-image-${item.id}`}
                                className={`case-fullscreen-item ${item.layout}`}
                            >
                                {/* ФИХ 2: клик по картинке открывает модальное окно с зумом */}
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

            {/* ── Модальное окно картинки с зумом ── */}
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
