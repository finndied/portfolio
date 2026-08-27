import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

// Импорт изображений шапки и меню
import headerImage from './assets/header-bg.png';
import aboutBg from './assets/about-bg.png';
import oneImg from './assets/one.png';
import twoImg from './assets/two.png';
import threeImg from './assets/three.png';
import fourImg from './assets/four.png';
import allBg from './assets/all.png';
import docIcon from './assets/doc.png';
import imgAuraCover from './assets/creative/aura-cover.png';
import decor1Left from './assets/decor1-left.png';
import decor1Right from './assets/decor1-right.png';
import decor2Left from './assets/decor2-left.png';
import decor2Right from './assets/decor2-right.png';
import decor3Left from './assets/decor3-left.png';
import decor3Right from './assets/decor3-right.png';
import decor4Left from './assets/decor4-left.png';
import decor4Right from './assets/decor4-right.png';

// Импорт PDF документов
import pdfHelp from './assets/docs/Help.pdf';
import pdfCategoryC from './assets/docs/category_c.pdf';
import pdfCategoryD from './assets/docs/category_d.pdf';
import pdfAura from './assets/creative/pdfAura.pdf';

// Импорт картинок для портфолио векторной графики
import img01_01_02 from './assets/vector/01_01_02.png';
import img01_01_07 from './assets/vector/01_01_07.png';
import img01_01_09 from './assets/vector/01_01_09.png';
import img01_01_12 from './assets/vector/01_01_12.png';
import img01_01_13 from './assets/vector/01_01_13.png';
import img03_09_01 from './assets/vector/03_09_01.png';
import img03_10_10 from './assets/vector/03_10_10.png';
import img03_10_19 from './assets/vector/03_10_19.png';
import img03_10_20 from './assets/vector/03_10_20.png';

import video01 from './assets/video/video01.mp4';
import video02 from './assets/video/video02.mp4';
import video03 from './assets/video/video03.mp4';
import video04 from './assets/video/video04.mp4';

import imgS7 from './assets/creative/s7.png';
import imgS7_2 from './assets/creative/s7_2.png';
import imgPortal from './assets/creative/portal.jpg';
import imgEmailKuper from './assets/creative/EmailKuper.png';

// --- КОМПОНЕНТ ПЛЕЕРА НА ВЕРХНЕМ УРОВНЕ ---
export const Player = ({ defaultImage = oneImg, scrollToSection }) => {
  const [currentImg, setCurrentImg] = useState(defaultImage);

  // Синхронизация: при переходе на новую секцию ставим дефолтную картинку
  useEffect(() => {
    setCurrentImg(defaultImage);
  }, [defaultImage]);

  return (
    <div className="player-container">
      <img src={currentImg} className="player-img" alt="Player Menu" />

      <div 
        className="player-click-zone zone-1" 
        onMouseEnter={() => setCurrentImg(oneImg)} 
        onClick={() => scrollToSection && scrollToSection('creative-section')}
        title="Рекламные креативы"
      />
      <div 
        className="player-click-zone zone-2" 
        onMouseEnter={() => setCurrentImg(twoImg)} 
        onClick={() => scrollToSection && scrollToSection('video-section')}
        title="Видеомонтаж"
      />
      <div 
        className="player-click-zone zone-3" 
        onMouseEnter={() => setCurrentImg(threeImg)} 
        onClick={() => scrollToSection && scrollToSection('vector-section')}
        title="Векторная графика"
      />
      <div 
        className="player-click-zone zone-4" 
        onMouseEnter={() => setCurrentImg(fourImg)} 
        onClick={() => scrollToSection && scrollToSection('copywrite-section')}
        title="Копирайтинг"
      />
    </div>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedCreativeIndex, setSelectedCreativeIndex] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const containerRef = useRef(null);
  const currentSectionRef = useRef(0);
  const isManualScrollingRef = useRef(false);

  const portfolioNavItems = [
    { id: 'creative-section', num: 1, title: 'Рекламные креативы' },
    { id: 'video-section', num: 2, title: 'Видеомонтаж' },
    { id: 'vector-section', num: 3, title: 'Векторная графика' },
    { id: 'copywrite-section', num: 4, title: 'Копирайтинг' },
  ];

  const creativeWorks = [
    { id: 1, img: imgS7, title: 'Рекламный баннер S7' },
    { id: 2, img: imgS7_2, title: 'Рекламный баннер S7' },
    { id: 3, img: imgPortal, title: 'Рекламный баннер компании Портал' },
    { id: 4, img: imgEmailKuper, title: 'Email-рассылка Купер' },
    {
      id: 5,
      img: imgAuraCover,
      file: pdfAura,
      isPdf: true,
      title: 'Пзентация Клубного дома Aura'
    },
  ];

  const videoWorks = [
    { id: 4, file: video04, title: 'Промо-ролик для Siberian Wellness' },
    { id: 3, file: video03, title: 'Видео для авиакомпании S7' },
    { id: 1, file: video01, title: 'Устройство электросамоката' },
    { id: 2, file: video02, title: 'Видео для автоюриста' }
  ];

  const vectorWorks = [
    { id: 1, img: img01_01_02, title: 'Векторная иллюстрация 01' },
    { id: 2, img: img01_01_07, title: 'Векторная иллюстрация 02' },
    { id: 3, img: img01_01_09, title: 'Векторная иллюстрация 03' },
    { id: 4, img: img01_01_12, title: 'Векторная иллюстрация 04' },
    { id: 5, img: img01_01_13, title: 'Векторная иллюстрация 05' },
    { id: 6, img: img03_09_01, title: 'Векторная иллюстрация 06' },
    { id: 7, img: img03_10_10, title: 'Векторная иллюстрация 07' },
    { id: 8, img: img03_10_19, title: 'Векторная иллюстрация 08' },
    { id: 9, img: img03_10_20, title: 'Векторная иллюстрация 09' },
  ];

  const copywritingWorks = [
    { id: 1, file: pdfHelp, title: 'Руководство Help.pdf' },
    { id: 2, file: pdfCategoryC, title: 'Руководство пользователя — Категория C' },
    { id: 3, file: pdfCategoryD, title: 'Руководство пользователя — Категория D' }
  ];

  const showPrevVideo = (e) => {
    if (e) e.stopPropagation();
    setSelectedVideoIndex((prev) => (prev === 0 ? videoWorks.length - 1 : prev - 1));
  };

  const showNextVideo = (e) => {
    if (e) e.stopPropagation();
    setSelectedVideoIndex((prev) => (prev === videoWorks.length - 1 ? 0 : prev + 1));
  };

  const showPrevCreative = (e) => {
    if (e) e.stopPropagation();
    setSelectedCreativeIndex((prev) => (prev === 0 ? creativeWorks.length - 1 : prev - 1));
  };

  const showNextCreative = (e) => {
    if (e) e.stopPropagation();
    setSelectedCreativeIndex((prev) => (prev === creativeWorks.length - 1 ? 0 : prev + 1));
  };

  const showPrevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? vectorWorks.length - 1 : prev - 1));
  };

  const showNextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === vectorWorks.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCreativeIndex(null);
        setSelectedVideoIndex(null);
        setSelectedImageIndex(null);
        setSelectedPdf(null);
      }
      if (selectedCreativeIndex !== null) {
        if (e.key === 'ArrowLeft') showPrevCreative();
        if (e.key === 'ArrowRight') showNextCreative();
      }
      if (selectedVideoIndex !== null) {
        if (e.key === 'ArrowLeft') showPrevVideo();
        if (e.key === 'ArrowRight') showNextVideo();
      }
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCreativeIndex, selectedVideoIndex, selectedImageIndex]);

  // Отслеживание текущей секции для навигации
  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollingRef.current) return;

        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          const index = Array.from(sections).indexOf(visibleEntry.target);
          if (index !== -1) {
            currentSectionRef.current = index;
            setActiveSectionIndex(index);
          }
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isScrolling = false;
    const sections = document.querySelectorAll('.snap-section');

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 0) {
        if (currentSectionRef.current < sections.length - 1) {
          currentSectionRef.current++;
        }
      } else {
        if (currentSectionRef.current > 0) {
          currentSectionRef.current--;
        }
      }

      isScrolling = true;

      sections[currentSectionRef.current].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const sections = Array.from(document.querySelectorAll('.snap-section'));
      const index = sections.indexOf(element);

      if (index !== -1) {
        isManualScrollingRef.current = true;

        currentSectionRef.current = index;
        setActiveSectionIndex(index);

        element.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          isManualScrollingRef.current = false;
        }, 850);
      }
    }
  };

  const getActiveBubble = () => {
    if (activeSectionIndex >= 8) return 4;
    if (activeSectionIndex >= 6) return 3;
    if (activeSectionIndex >= 4) return 2;
    if (activeSectionIndex >= 2) return 1;
    return 0;
  };

  const activeBubbleNum = getActiveBubble();
  const showSidebar = activeSectionIndex >= 2;

  return (
    <div className="snap-container" ref={containerRef}>

      {/* ПЛАВАЮЩАЯ НАВИГАЦИЯ FRUTIGER AERO */}
      <div className={`frutiger-bubble-nav ${showSidebar ? 'visible' : ''}`}>
        {portfolioNavItems.map((item) => (
          <button
            key={item.id}
            className={`aero-bubble-btn ${activeBubbleNum === item.num ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
            title={item.title}
          >
            {item.num}
          </button>
        ))}
      </div>

      {/* СЕКЦИЯ 1: HERO */}
      <section className="snap-section hero-section" id="hero-section">
        <header className="header-nav-aero">
          <button className="aero-glass-btn" onClick={() => scrollToSection('about-section')}>
            ОБО МНЕ
          </button>
          <button className="aero-glass-btn" onClick={() => scrollToSection('menu-creative-section')}>
            РАБОТЫ
          </button>
          <button className="aero-glass-btn" onClick={() => setIsModalOpen(true)}>
            СВЯЗАТЬСЯ
          </button>
        </header>

        <img src={headerImage} alt="Portfolio Hero" className="hero-background-img" />

        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('about-section')}>
          ↓
        </div>
      </section>

      {/* СЕКЦИЯ 2: ОБО МНЕ */}
      <section className="snap-section hero-section" id="about-section">
        <img src={aboutBg} alt="About Background" className="hero-background-img" />

        <div className="about-page-wrapper">
          <div className="about-card-modern">
            <h1 className="about-title">Обо мне</h1>

            <div className="about-row">
              <p className="about-text">
                Привет! Меня зовут Илья, мне 23 года. Обладаю сильным техническим бэкграундом и опытом создания контента.
              </p>
            </div>

            <div className="about-divider" />

            <div className="about-row column">
              <span className="about-tag">[ ЧТО Я УМЕЮ ]</span>
              <p className="about-text">
                Я умею самостоятельно закрывать весь цикл производства: от структурирования сложных текстов до полной отрисовки графики (Photoshop, Illustrator) и создания видеоконтента (After Effects, CapCut и др.).
              </p>
            </div>

            <div className="about-divider" />

            <div className="about-row column">
              <span className="about-tag">[ ОПЫТ И НАВЫКИ ]</span>
              <div className="about-text">
                <p>Имею реальный опыт работы в продуктовых ИТ-командах:</p>

                <div className="about-grid-list">
                  <div className="about-col">
                    <div className="about-col-title">ДИЗАЙН И ВИДЕО</div>
                    <ul className="about-list">
                      <li>Дизайн и графика для 12 мини-игр АПК «Forward. Дорога без опасности».</li>
                      <li>Авторская графика (Photoshop / Illustrator) для «Интерактивной автошколы».</li>
                      <li>Видеомонтаж и 2D-анимация в Adobe After Effects.</li>
                      <li>Иллюстративный материал для учебных конспектов.</li>
                    </ul>
                  </div>

                  <div className="about-col">
                    <div className="about-col-title">ТЕКСТЫ И ВЕРСТКА</div>
                    <ul className="about-list">
                      <li>200 000+ слов конспектов ОБЗР (8–11 классы) для портала «Форвард».</li>
                      <li>Составление техдокументации (автосимулятор City Car Driving и др.).</li>
                      <li>HTML-верстка контента для интеграции в продукты.</li>
                      <li>Управление публикациями и контроль версий через GitLab.</li>
                    </ul>
                  </div>
                </div>

                <p style={{ marginTop: '12px' }}>
                  Быстро разбираюсь в логике сложных продуктов, использую ИИ для автоматизации рутины и создаю контент по бренд-гайдам.
                </p>
              </div>
            </div>

            <div className="about-divider" />

            <div className="about-tools">
              ADOBE PHOTOSHOP - ADOBE ILLUSTRATOR - AFTER EFFECTS - FIGMA - HTML - GITLAB - AI
            </div>
          </div>
        </div>

        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('menu-creative-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ</span>
        </div>
      </div>

      {/* СЕКЦИЯ 3: МЕНЮ 1 — КРЕАТИВЫ */}
      <section className="snap-section hero-section" id="menu-creative-section">
        <img src={allBg} alt="Фон" className="hero-background-img" />
        <img src={decor1Right} alt="" className="menu-decor decor-bottom-right" />
        <img src={decor1Left} alt="" className="menu-decor decor-top-left" />
        
        <Player defaultImage={oneImg} scrollToSection={scrollToSection} />

        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('creative-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ • РЕКЛАМНЫЕ КРЕАТИВЫ</span>
        </div>
      </div>

      {/* СЕКЦИЯ 4: 1. РЕКЛАМНЫЕ КРЕАТИВЫ */}
      <section className="snap-section" id="creative-section">
        <div className="app-container">
          <div className="section-title">1. РЕКЛАМНЫЕ КРЕАТИВЫ</div>
          <div className="vector-grid">
            {creativeWorks.map((work, index) => (
              <div
                key={work.id}
                className="vector-card aero-card doc-card"
                onClick={() => {
                  if (work.isPdf) {
                    setSelectedPdf(work.file);
                  } else {
                    setSelectedCreativeIndex(index);
                  }
                }}
              >
                <div className="vector-img-wrapper">
                  <img
                    src={work.img}
                    alt={work.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                  />
                </div>
                <span className="doc-card-title" style={{ marginTop: '12px' }}>
                  {work.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('menu-video-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ</span>
        </div>
      </div>

      {/* СЕКЦИЯ 5: МЕНЮ 2 — ВИДЕОМОНТАЖ */}
      <section className="snap-section hero-section" id="menu-video-section">
        <img src={allBg} alt="Фон" className="hero-background-img" />
        <img src={decor2Left} alt="" className="menu-decor decor-top-left" />
        <img src={decor2Right} alt="" className="menu-decor decor-bottom-right" />
        
        <Player defaultImage={twoImg} scrollToSection={scrollToSection} />

        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('video-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ • ВИДЕОМОНТАЖ</span>
        </div>
      </div>

      {/* СЕКЦИЯ 6: 2. ВИДЕОМОНТАЖ */}
      <section className="snap-section" id="video-section">
        <div className="app-container">
          <div className="section-title">2. ВИДЕОМОНТАЖ</div>
          <div className="vector-grid">
            {videoWorks.map((work, index) => (
              <div key={work.id} className="vector-card doc-card aero-card" onClick={() => setSelectedVideoIndex(index)}>
                <div className="vector-img-wrapper">
                  <video src={work.file} className="video-preview" muted loop preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                  <div className="play-button-overlay"></div>
                </div>
                <span className="doc-card-title" style={{ marginTop: '15px' }}>{work.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('menu-vector-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА</span>
        </div>
      </div>

      {/* СЕКЦИЯ 7: МЕНЮ 3 — ВЕКТОРНАЯ ГРАФИКА */}
      <section className="snap-section hero-section" id="menu-vector-section">
        <img src={allBg} alt="Фон" className="hero-background-img" />
        <img src={decor3Right} alt="" className="menu-decor decor-bottom-right" />
        <img src={decor3Left} alt="" className="menu-decor decor-top-left" />
        
        <Player defaultImage={threeImg} scrollToSection={scrollToSection} />

        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('vector-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА • ВЕКТОРНАЯ ГРАФИКА</span>
        </div>
      </div>

      {/* СЕКЦИЯ 8: 3. ВЕКТОРНАЯ ГРАФИКА */}
      <section className="snap-section" id="vector-section">
        <div className="app-container">
          <div className="section-title">3. ВЕКТОРНАЯ ГРАФИКА</div>
          <div className="vector-grid">
            {vectorWorks.map((work, index) => (
              <div key={work.id} className="vector-card aero-card" onClick={() => setSelectedImageIndex(index)}>
                <div className="vector-img-wrapper">
                  <img src={work.img} alt={work.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('menu-copywrite-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ</span>
        </div>
      </div>

      {/* СЕКЦИЯ 9: МЕНЮ 4 — КОПИРАЙТИНГ */}
      <section className="snap-section hero-section" id="menu-copywrite-section">
        <img src={allBg} alt="Фон" className="hero-background-img" />
        <img src={decor4Left} alt="" className="menu-decor decor-top-left" />
        <img src={decor4Right} alt="" className="menu-decor decor-bottom-right" />
        
        <Player defaultImage={fourImg} scrollToSection={scrollToSection} />

        <div className="scroll-next-arrow hero-scroll-arrow" onClick={() => scrollToSection('copywrite-section')}>
          ↓
        </div>
      </section>

      <div className="blue-ticker-banner">
        <div className="ticker-track">
          <span>КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ • КОПИРАЙТИНГ</span>
        </div>
      </div>

      {/* СЕКЦИЯ 10: 4. КОПИРАЙТИНГ */}
      <section className="snap-section" id="copywrite-section">
        <div className="app-container">
          <div className="section-title">4. КОПИРАЙТИНГ</div>
          <div className="vector-grid">
            {copywritingWorks.map((work) => (
              <div key={work.id} className="vector-card doc-card aero-card" onClick={() => setSelectedPdf(work.file)}>
                <div className="vector-img-wrapper">
                  <img src={docIcon} alt="PDF Document" />
                </div>
                <span className="doc-card-title" style={{ marginTop: '15px' }}>{work.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* МОДАЛЬНЫЕ ОКНА */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content aero-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <div className="section-titles">СВЯЗАТЬСЯ</div>
            <div className="contact-buttons-container">
              <a href="https://t.me/qwexkmmk" target="_blank" rel="noreferrer" className="circle-contact-btn tg-btn">
                <span>TG</span>
              </a>
              <a href="https://hh.ru/resume/0a43e06dff0bc693600039ed1f674b584c344c" target="_blank" rel="noreferrer" className="circle-contact-btn hh-btn">
                <span>HH</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedCreativeIndex !== null && (
        <div className="image-modal-overlay" onClick={() => setSelectedCreativeIndex(null)}>
          <button className="nav-arrow left-arrow" onClick={showPrevCreative}>‹</button>
          <div className="image-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCreativeIndex(null)}>×</button>
            <img src={creativeWorks[selectedCreativeIndex].img} alt={creativeWorks[selectedCreativeIndex].title} />
          </div>
          <button className="nav-arrow right-arrow" onClick={showNextCreative}>›</button>
        </div>
      )}

      {selectedVideoIndex !== null && (
        <div className="image-modal-overlay" onClick={() => setSelectedVideoIndex(null)}>
          <button className="nav-arrow left-arrow" onClick={showPrevVideo}>‹</button>
          <div className="image-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedVideoIndex(null)}>×</button>
            <video key={videoWorks[selectedVideoIndex].file} src={videoWorks[selectedVideoIndex].file} controls autoPlay style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)' }} />
          </div>
          <button className="nav-arrow right-arrow" onClick={showNextVideo}>›</button>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div className="image-modal-overlay" onClick={() => setSelectedImageIndex(null)}>
          <button className="nav-arrow left-arrow" onClick={showPrevImage}>‹</button>
          <div className="image-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedImageIndex(null)}>×</button>
            <img src={vectorWorks[selectedImageIndex].img} alt={vectorWorks[selectedImageIndex].title} />
          </div>
          <button className="nav-arrow right-arrow" onClick={showNextImage}>›</button>
        </div>
      )}

      {selectedPdf !== null && (
        <div className="pdf-modal-overlay" onClick={() => setSelectedPdf(null)}>
          <div className="pdf-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPdf(null)}>×</button>
            <iframe src={`${selectedPdf}#toolbar=1`} title="PDF Viewer" width="100%" height="100%" />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;