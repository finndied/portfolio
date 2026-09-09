import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CaseBlock.scss';

// ── Импорты картинок ──────────────────────────────────────────────────────────
import imgHero        from './hotel-alta/hotel-main.png';
import imgMoodboard   from './hotel-alta/moodboard.png';
import imgColorSystem from './hotel-alta/color.png';
import imgLogo        from './hotel-alta/logo.png';
import imgMenu        from './hotel-alta/print/menyu-obshee.png';
import imgNabor       from './hotel-alta/print/prezentaciya-podarochnogo-nabora.png';
import imgVizitka     from './hotel-alta/color.png';

import imgGuestExperience1 from './hotel-alta/print/print-na-fartuke.png';
import imgGuestExperience2 from './hotel-alta/print/prezentaciya-vizitki.png';
import imgGuestExperience3 from './hotel-alta/print/tablichka-na-dver.png';
import imgGuestExperience4 from './hotel-alta/print/prezentaciya-podarochnogo-nabora.png';

import imgStories1 from './hotel-alta/socials/stories.png';
import imgStories2 from './hotel-alta/socials/stories-2.png';
import imgKarusel1 from './hotel-alta/socials/karusel-1.png';
import imgKarusel2 from './hotel-alta/socials/karusel-2.png';
import imgKarusel3 from './hotel-alta/socials/karusel-3.png';
import imgKarusel4 from './hotel-alta/socials/karusel-4.png';
import imgKarusel5 from './hotel-alta/socials/karusel-5.png';
import imgKarusel6 from './hotel-alta/socials/karusel-6.png';
import imgOffer1    from './hotel-alta/socials/reklamniy-banner.png';
import imgOffer2    from './hotel-alta/socials/reklamniy-banner-2.png';
import imgOffer3    from './hotel-alta/socials/reklamniy-banner-3.png';

// ─────────────────────────────────────────────────────────────────────────────
// CaseImageModal — зум картинки
// ─────────────────────────────────────────────────────────────────────────────
const CaseImageModal = ({ src, alt, onClose }) => {
    const [isZoomed, setIsZoomed]               = useState(false);
    const [transformOrigin, setTransformOrigin] = useState('50% 50%');
    const [translate, setTranslate]             = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging]           = useState(false);

    const startPosRef   = useRef({ x: 0, y: 0 });
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
            if (hasDraggedRef.current)
                setTranslate({ x: e.clientX - startPosRef.current.x, y: e.clientY - startPosRef.current.y });
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
                        transform: isZoomed
                            ? `translate(${translate.x}px,${translate.y}px) scale(3)`
                            : 'translate(0,0) scale(1)',
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

// ─────────────────────────────────────────────
// Структура секций детального кейса ALTA HOTEL
// ─────────────────────────────────────────────
const caseSections = [
    {
        id: 'hero',
        title: 'ALTA HOTEL',
        description: 'Брендинг и визуальная коммуникация концептуального 5★ lifestyle-отеля в Новосибирске',
        year: '2026 · Concept Project',
        content: [
            'ALTA — концептуальный современный отель в Новосибирске, объединяющий проживание, гастрономию, SPA и городские впечатления.',
            'Задача проекта — разработать визуальную систему, которая одинаково органично работает в digital-среде, полиграфии, рекламе, сувенирной продукции и физическом пространстве отеля.',
        ],
        image: imgHero,
    },
    {
        id: 'context',
        title: '01. КОНТЕКСТ',
        content: [
            'ALTA позиционируется как современный городской отель с эстетикой quiet luxury и локальным характером.',
            'Отель объединяет:',
            'Rooms · Restaurant · SPA · Bar · Events',
            'Основная аудитория — гости города, деловые путешественники и люди, которые выбирают отель не только для проживания, но и как пространство для отдыха.',
        ],
    },
    {
        id: 'task',
        title: '02. ЗАДАЧА',
        content: [
            'Требовалось создать цельную визуальную систему, которую можно масштабировать на все основные точки контакта с гостем.',
            'Основные задачи',
            '01. Создать узнаваемую айдентику.',
            '02. Передать ощущение современной премиальности без избыточной декоративности.',
            '03. Связать цифровые и физические носители одной системой.',
            '04. Сделать визуальный язык достаточно гибким для разных подразделений отеля.',
        ],
    },
    {
        id: 'direction',
        title: '03. НАПРАВЛЕНИЕ',
        content: [
            'Вместо прямолинейного визуального образа Сибири я выбрал более сдержанную интерпретацию.',
            'Не горы, медведи, орнаменты, а: архитектура · тёмное дерево · камень · холодный городской пейзаж · спокойная роскошь.',
            'Так бренд остаётся современным и премиальным, но сохраняет связь с местом.',
            'Moodboard отражает визуальные референсы, которые легли в основу айдентики и коммуникации ALTA:',
        ],
        image: imgMoodboard,
    },
    {
        id: 'colors',
        title: '04. ЦВЕТОВАЯ СИСТЕМА',
        content: [
            'Gold: #DFB763',
            'Ink: #171817',
            'Wine: #5C121C',
            'Cream: #F1ECE4',
        ],
        image: imgColorSystem,
    },
    {
        id: 'logo',
        title: '05. ЛОГОТИП',
        content: [
            'Основой айдентики стал геометрический знак, построенный вокруг стилизованной буквы A.',
            'Знак состоит из нескольких геометрических элементов и может существовать самостоятельно без названия бренда.',
            'Логотип не имеет одного фиксированного цвета и был спроектирован как адаптивный элемент айдентики, а не как знак, привязанный к одному цвету.',
            'Он может менять цвет в зависимости от носителя: золото — премиальная физическая среда · белый — фотографии / dark background · графит — различные поверхности',
        ],
        image: imgLogo,
    },
    {
        id: 'advertising',
        title: '06. ADVERTISING OFFER',
        content: [
            'Универсальная система рекламных офферов для продвижения разных направлений ALTA.',
            'Для кампаний была разработана отдельная визуальная система, которая адаптируется под разные продукты бренда: номера, ресторан, SPA, специальные предложения и другие сервисы.',
            'Основной принцип: эмоциональный визуал — короткое преимущество — конкретный оффер — действие.',
            'Система позволяет сохранять единый стиль ALTA, меняя содержание и визуальный акцент в зависимости от продвигаемого направления.',
        ],
        images: [imgOffer1, imgOffer2, imgOffer3],
        layout: 'grid-3',
    },
    {
        id: 'social-carousel',
        title: '07. SOCIAL MEDIA',
        subtitle: 'Карусель',
        images: [imgKarusel1, imgKarusel2, imgKarusel3, imgKarusel4, imgKarusel5, imgKarusel6],
        layout: 'grid-3',
    },
    {
        id: 'social-stories',
        title: '07. SOCIAL MEDIA',
        subtitle: 'Сторис',
        images: [imgStories1, imgStories2],
        layout: 'grid-2',
    },
    {
        id: 'menu',
        title: '08. RESTAURANT MENU',
        content: [
            'Меню ресторана.',
            'В основе дизайна меню — текстура натурального дерева, глубокие бордово-коричневые оттенки, чёрные тарелки и выразительные фотографии блюд. Визуал сочетает брутальный и премиальный характер.',
        ],
        image: imgMenu,
    },
    {
        id: 'guest-experience',
        title: '09. GUEST EXPERIENCE',
        images: [imgGuestExperience1, imgGuestExperience2, imgGuestExperience3, imgGuestExperience4],
        layout: 'grid-2',
    },
    {
        id: 'reflection',
        title: '10. REFLECTION',
        content: [
            'Главной задачей было не создать отдельный набор красивых носителей, а выстроить систему, способную сохранять характер бренда при масштабировании на разные форматы и среды.',
            'В результате сформирована масштабируемая визуальная система, которая объединяет коммуникацию отеля, ресторана, SPA и гостевого опыта в единый бренд.',
        ],
    },
];

// ─────────────────────────────────────────────
// Главный компонент CaseBlock
// ─────────────────────────────────────────────
const CaseBlock = () => {
    const [isDetailOpen, setIsDetailOpen]           = useState(false);
    const [scrollToSectionId, setScrollToSectionId] = useState(null);
    const [modalImage, setModalImage]               = useState(null);

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

    // Snap-скролл по секциям внутри кейса + блокировка App.js wheel
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

    const previewImages = [
        { id: 'hero',             img: imgHero },
        { id: 'logo',             img: imgLogo },
        { id: 'advertising',      img: imgOffer1 },
        { id: 'social-carousel',  img: imgKarusel1 },
        { id: 'social-carousel',  img: imgKarusel2 },
        { id: 'social-carousel',  img: imgKarusel3 },
        { id: 'menu',             img: imgMenu },
        { id: 'guest-experience', img: imgVizitka },
        { id: 'guest-experience', img: imgNabor },
    ];

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
                    {previewImages.map((item, index) => (
                        <div
                            key={index}
                            className="case-preview-item"
                            onClick={() => handleOpenCase(item.id)}
                        >
                            <img src={item.img} alt={`Preview ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {isDetailOpen && (
                <div
                    className="case-detail-overlay"
                    ref={detailOverlayRef}
                    onClick={(e) => { if (e.target === detailOverlayRef.current) closeDetail(); }}
                >
                    <div className="case-detail-header">
                        <h2 className="case-detail-header-title">Кейс ALTA HOTEL</h2>
                        <button className="case-detail-close" onClick={closeDetail} title="Закрыть">×</button>
                    </div>

                    <div className="case-detail-content">
                        {caseSections.map((section) => (
                            <section
                                key={section.id}
                                id={`case-section-${section.id}`}
                                className="case-detail-section"
                            >
                                <div className="case-detail-section-inner">
                                    {section.title       && <h1 className="case-detail-title">{section.title}</h1>}
                                    {section.subtitle    && <h2 className="case-detail-subtitle">{section.subtitle}</h2>}
                                    {section.description && <p className="case-detail-description">{section.description}</p>}
                                    {section.year        && <p className="case-detail-year">{section.year}</p>}

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
                                                        alt={`${section.title || section.subtitle} ${idx + 1}`}
                                                        className="case-detail-image"
                                                        onClick={() => setModalImage({ src: img, alt: `${section.title || section.subtitle} ${idx + 1}` })}
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

export default CaseBlock;
