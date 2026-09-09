import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CaseBlock.scss';

import imgCandyHero from './candy/candy-hero.png';
import imgVisualConcept from './candy/visual-concept.png';
import imgPackaging from './candy/packaging.png';
import imgAi3d from './candy/3d.png';
import imgAdvertising from './candy/advertising.png';
import imgDigitalCreative from './candy/digital-creative.png';

// Превью-сетка (9 превью)
const previewList = [
    { sectionId: 'candy-hero', img: imgCandyHero },
    { sectionId: 'candy-visual', img: imgVisualConcept },
    { sectionId: 'candy-packaging', img: imgPackaging },
    { sectionId: 'candy-advertising', img: imgAdvertising },
    { sectionId: 'candy-ai3d', img: imgAi3d },
    { sectionId: 'candy-digital', img: imgDigitalCreative },
    { sectionId: 'candy-ai3d', img: imgAi3d },
    { sectionId: 'candy-packaging', img: imgPackaging },
    { sectionId: 'candy-hero', img: imgCandyHero },
];

// ─────────────────────────────────────────────────────────────────────────────
// Секции детального просмотра
// ─────────────────────────────────────────────────────────────────────────────
const candySections = [
    {
        id: 'candy-hero',
        title: 'MONSTER ENERGY CANDY',
        subtitle: 'Visual Concept · 3D · AI Generation · Advertising',
        description: 'Концептуальная рекламная кампания для Monster Energy Candy',
        year: '2026 · Concept Project',
        image: imgCandyHero,
    },
    {
        id: 'candy-context',
        title: '01. КОНТЕКСТ',
        content: [
            'Monster Energy Candy.',
            'Концептуальная конфета в эстетике Monster Energy Ultra Rosa, объединяющая характер бренда, визуальную энергию продукта и эстетику современной digital-рекламы.',
            'Задача проекта — создать 3D-визуал продукта и рекламную систему, которая выглядела бы как полноценная коммерческая кампания.',
        ],
    },
    {
        id: 'candy-task',
        title: '02. ЗАДАЧА',
        content: [
            'Требовалось создать 3D-визуальный образ нового продукта и несколько рекламных коммуникаций на его основе.',
            'Основные задачи',
            '01. Разработать форму конфеты.',
            '02. Создать упаковку и продуктовый визуал.',
            '03. Сформировать единую визуальную концепцию.',
            '04. Создать рекламные композиции и баннеры.',
        ],
    },
    {
        id: 'candy-visual',
        title: '03. ВИЗУАЛЬНАЯ КОНЦЕПЦИЯ',
        content: [
            'От идеи к продукту.',
            'Концепция строилась как последовательность: брендовый символ — форма конфеты — упаковка — 3D-объект.',
        ],
        image: imgVisualConcept,
    },
    {
        id: 'candy-packaging',
        title: '04. УПАКОВКА',
        content: [
            'Следующим этапом 3D-продукт был перенесён в упаковочную концепцию.',
            'Упаковка повторяет визуальный язык продукта:',
            'Ultra Rosa pink — конфета — metallic details — Monster identity',
        ],
        image: imgPackaging,
    },
    {
        id: 'candy-ai3d',
        title: '05. AI + 3D',
        content: [
            'AI использовался как инструмент для ускорения визуальной разработки и создания рекламных сцен.',
            '01. Создание и поиск подходящей визуальной среды.',
            '02. Разработка конфеты.',
            '03. Объединение 3D-продукта, фона и дополнительных элементов.',
        ],
        image: imgAi3d,
    },
    {
        id: 'candy-advertising',
        title: '06. ADVERTISING CAMPAIGN',
        images: [imgAdvertising],
        layout: 'grid-2',
    },
    {
        id: 'candy-digital',
        title: '07. DIGITAL CREATIVE',
        images: [imgDigitalCreative],
        layout: 'grid-2',
    },
    {
        id: 'candy-reflection',
        title: '08. REFLECTION',
        content: [
            'В результате была разработана цельная визуальная концепция вымышленного продукта, объединяющая 3D-моделирование, AI-generated imagery, предметную композицию и рекламный дизайн.',
        ],
        image: imgCandyHero,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// CaseImageModal — зум картинки (копия из CaseBlock)
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
            if (isZoomed) { setIsZoomed(false); setTranslate({ x: 0, y: 0 }); }
            else onClose();
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
            startPosRef.current = { x: e.clientX - translate.x, y: e.clientY - translate.y };
        }
    };

    useEffect(() => {
        const onMove = (e) => {
            if (!isDragging) return;
            const dx = Math.abs(e.clientX - (startPosRef.current.x + translate.x));
            const dy = Math.abs(e.clientY - (startPosRef.current.y + translate.y));
            if (dx > 5 || dy > 5) hasDraggedRef.current = true;
            if (hasDraggedRef.current) setTranslate({ x: e.clientX - startPosRef.current.x, y: e.clientY - startPosRef.current.y });
        };
        const onUp = () => { if (isDragging) setIsDragging(false); };
        if (isDragging) { window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp); }
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    }, [isDragging, translate]);

    const handleImgClick = (e) => {
        e.stopPropagation();
        if (hasDraggedRef.current) { hasDraggedRef.current = false; return; }
        if (isZoomed) { setIsZoomed(false); setTranslate({ x: 0, y: 0 }); }
        else {
            const rect = e.currentTarget.getBoundingClientRect();
            setTransformOrigin(`${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`);
            setTranslate({ x: 0, y: 0 });
            setIsZoomed(true);
        }
    };

    const cursor = isDragging ? 'grabbing' : isZoomed ? 'zoom-out' : 'zoom-in';

    return (
        <div className="case-img-modal-overlay" onClick={() => { if (!isZoomed) onClose(); }}>
            <div className="case-img-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <button className="case-img-modal-close" onClick={onClose} title="Закрыть">×</button>
                <img
                    src={src} alt={alt}
                    onClick={handleImgClick}
                    onMouseDown={handleMouseDown}
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                        cursor,
                        transform: isZoomed ? `translate(${translate.x}px,${translate.y}px) scale(3)` : 'translate(0,0) scale(1)',
                        transformOrigin,
                        transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,1,0.5,1)',
                        maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain',
                        display: 'block', userSelect: 'none', borderRadius: '12px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                    }}
                />
                {isZoomed && (
                    <div className="case-img-modal-hint">Перетащите мышью · Клик или Escape — уменьшить</div>
                )}
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// CaseBlockCandy — главный компонент
// ─────────────────────────────────────────────────────────────────────────────
const CaseBlockCandy = () => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [scrollToSectionId, setScrollToSectionId] = useState(null);
    const [modalImage, setModalImage] = useState(null);

    const detailOverlayRef = useRef(null);

    const handleOpenCase = useCallback((sectionId = null) => {
        setIsDetailOpen(true);
        setScrollToSectionId(sectionId);
        setModalImage(null);
        document.body.classList.add('case-open');
    }, []);

    const closeDetail = useCallback(() => {
        if (modalImage) { setModalImage(null); return; }
        setIsDetailOpen(false);
        setScrollToSectionId(null);
        document.body.classList.remove('case-open');
    }, [modalImage]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isDetailOpen && !modalImage) closeDetail();
        };
        if (isDetailOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isDetailOpen, modalImage, closeDetail]);

    // Snap-скролл по секциям внутри кейса
    useEffect(() => {
        if (!isDetailOpen) return;
        const overlay = detailOverlayRef.current;
        if (!overlay) return;

        let isScrolling = false;
        let currentIndex = 0;

        const handleWheel = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (isScrolling) return;

            const sections = overlay.querySelectorAll('.case-detail-section');
            if (!sections.length) return;

            if (e.deltaY > 0 && currentIndex < sections.length - 1) currentIndex++;
            else if (e.deltaY < 0 && currentIndex > 0) currentIndex--;

            isScrolling = true;
            sections[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { isScrolling = false; }, 800);
        };

        overlay.addEventListener('wheel', handleWheel, { capture: true, passive: false });
        return () => overlay.removeEventListener('wheel', handleWheel, { capture: true });
    }, [isDetailOpen]);

    // Скролл к нужной секции при открытии
    useEffect(() => {
        if (isDetailOpen && scrollToSectionId !== null) {
            setTimeout(() => {
                const el = document.getElementById(`case-section-${scrollToSectionId}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }, [isDetailOpen, scrollToSectionId]);

    useEffect(() => () => { document.body.classList.remove('case-open'); }, []);

    return (
        <>
            {/* ── Превью-блок ── */}
            <div className="case-glass-block">
                <div className="case-header">
                    <div className="case-title-section">
                        <h3 className="case-subtitle">Кейс MONSTER ENERGY CANDY</h3>
                        <p className="case-description">
                            [Visual Concept, 3D, AI Generation, Advertising]
                        </p>
                    </div>
                    <button className="case-open-btn" onClick={() => handleOpenCase(null)}>
                        Открыть
                    </button>
                </div>

                <div className="case-preview-grid">
                    {previewList.map((item, index) => (
                        <div
                            key={index}
                            className="case-preview-item"
                            onClick={() => handleOpenCase(item.sectionId)}
                        >
                            <img src={item.img} alt={`Preview ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Детальный просмотр ── */}
            {isDetailOpen && (
                <div
                    className="case-detail-overlay"
                    ref={detailOverlayRef}
                    onClick={(e) => { if (e.target === detailOverlayRef.current) closeDetail(); }}
                >
                    <div className="case-detail-header">
                        <h2 className="case-detail-header-title">Monster Energy Candy</h2>
                        <button className="case-detail-close" onClick={closeDetail} title="Закрыть">×</button>
                    </div>

                    <div className="case-detail-content">
                        {candySections.map((section) => (
                            <section
                                key={section.id}
                                id={`case-section-${section.id}`}
                                className="case-detail-section"
                            >
                                <div className="case-detail-section-inner">
                                    {section.title && <h1 className="case-detail-title">{section.title}</h1>}
                                    {section.subtitle && <h2 className="case-detail-subtitle">{section.subtitle}</h2>}
                                    {section.description && <p className="case-detail-description">{section.description}</p>}
                                    {section.year && <p className="case-detail-year">{section.year}</p>}

                                    {section.content && (
                                        <div className="case-detail-text">
                                            {section.content.map((line, i) => <p key={i}>{line}</p>)}
                                        </div>
                                    )}

                                    {section.image && (
                                        <div className="case-detail-image-container">
                                            <img
                                                src={section.image}
                                                alt={section.title}
                                                className="case-detail-image"
                                                onClick={() => setModalImage({ src: section.image, alt: section.title })}
                                            />
                                        </div>
                                    )}

                                    {section.images && (
                                        <div className={`case-detail-images-grid ${section.layout || 'grid-auto'}`}>
                                            {section.images.map((img, idx) => (
                                                <div key={idx} className="case-detail-image-container">
                                                    <img
                                                        src={img}
                                                        alt={`${section.title} ${idx + 1}`}
                                                        className="case-detail-image"
                                                        onClick={() => setModalImage({ src: img, alt: `${section.title} ${idx + 1}` })}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
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

export default CaseBlockCandy;
