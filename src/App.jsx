import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

import aiIcon from './assets/ai.png';
import docIcon from './assets/doc.png';
import psdIcon from './assets/ps.png';
import aeIcon from './assets/ae.png';
// Импорт PDF документов (Файлы должны лежать в src/assets/docs/)
import pdfHelp from './assets/docs/Help.pdf';
import pdfCategoryC from './assets/docs/category_c.pdf';
import pdfCategoryD from './assets/docs/category_d.pdf';

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
import img2 from './assets/vector/02.jpg';
import img3 from './assets/vector/03.jpg';
import img4 from './assets/vector/04.jpg';
import img5 from './assets/vector/05.png';
import img6 from './assets/vector/06.png';
import img7 from './assets/vector/07.jpg';
import img8 from './assets/vector/08.jpg';
import img9 from './assets/vector/09.jpg';

import video01 from './assets/video/video01.mp4';
import video02 from './assets/video/video02.mp4';
import video03 from './assets/video/video03.mp4';

import imgS7 from './assets/creative/s7.png';
import imgS7_2 from './assets/creative/s7_2.png';
import imgPortal from './assets/creative/portal.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const containerRef = useRef(null);

  const creativeWorks = [
    { id: 1, img: imgS7, title: 'Рекламный баннер S7 — Вариант 1' },
    { id: 2, img: imgS7_2, title: 'Рекламный баннер S7 — Вариант 2' },
    { id: 3, img: imgPortal, title: 'Креатив для компании Portal' }
  ];

  const [selectedCreativeIndex, setSelectedCreativeIndex] = useState(null);

  const videoWorks = [
    { id: 3, file: video03, title: 'Видео для авикомпании S7' },
    { id: 1, file: video01, title: 'Устройство электросамоката' },
    { id: 2, file: video02, title: 'Видео для автоюриста' }
  ];

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const showPrevVideo = (e) => {
    if (e) e.stopPropagation();
    setSelectedVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoWorks.length - 1 : prevIndex - 1
    );
  };

  const showNextVideo = (e) => {
    if (e) e.stopPropagation();
    setSelectedVideoIndex((prevIndex) =>
      prevIndex === videoWorks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevCreative = (e) => {
    if (e) e.stopPropagation();
    setSelectedCreativeIndex((prevIndex) =>
      prevIndex === 0 ? creativeWorks.length - 1 : prevIndex - 1
    );
  };

  const showNextCreative = (e) => {
    if (e) e.stopPropagation();
    setSelectedCreativeIndex((prevIndex) =>
      prevIndex === creativeWorks.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (selectedCreativeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrevCreative();
      if (e.key === 'ArrowRight') showNextCreative();
      if (e.key === 'Escape') setSelectedCreativeIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCreativeIndex]);

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
    { id: 10, img: img2, title: 'Векторная иллюстрация 10' },
    { id: 11, img: img3, title: 'Векторная иллюстрация 11' },
    { id: 12, img: img4, title: 'Векторная иллюстрация 12' },
    { id: 13, img: img5, title: 'Векторная иллюстрация 13' },
    { id: 14, img: img6, title: 'Векторная иллюстрация 14' },
    { id: 15, img: img7, title: 'Векторная иллюстрация 15' },
    { id: 16, img: img8, title: 'Векторная иллюстрация 16' },
    { id: 17, img: img9, title: 'Векторная иллюстрация 17' },
  ];

  const [selectedPdf, setSelectedPdf] = useState(null);

  const copywritingWorks = [
    { id: 1, file: pdfHelp, title: 'Руководство Help.pdf' },
    { id: 2, file: pdfCategoryC, title: 'Руководство пользователя — Категория C' },
    { id: 3, file: pdfCategoryD, title: 'Руководство пользователя — Категория D' }
  ];

  // Жесткий сброс скролла на самый верх для всех возможных контейнеров при смене страницы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTo(0, 0);
    if (document.body) document.body.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (selectedVideoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrevVideo();
      if (e.key === 'ArrowRight') showNextVideo();
      if (e.key === 'Escape') setSelectedVideoIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideoIndex]);

  useEffect(() => {
    if (!selectedPdf) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPdf(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPdf]);

  // Возврат на главную и мгновенный перенос к секции с работами
  const handleBackToMain = () => {
    setCurrentPage('main');

    setTimeout(() => {
      const element = document.getElementById('works-section');
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 20);
  };

  const showPrevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? vectorWorks.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === vectorWorks.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Горячие клавиши для модалки
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Скролл-хак для главной страницы (Section Snapping)
  useEffect(() => {
    if (isModalOpen || selectedImageIndex !== null || currentPage !== 'main') return;

    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      const delta = e.deltaY;
      isScrolling = true;

      const sections = Array.from(container.querySelectorAll('.snap-section'));
      const currentSectionIndex = sections.findIndex(
        (section) =>
          section.getBoundingClientRect().top >= -10 &&
          section.getBoundingClientRect().top <= 10
      );

      let nextIndex = currentSectionIndex;

      if (delta > 0) {
        nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
      } else {
        nextIndex = Math.max(currentSectionIndex - 1, 0);
      }

      if (sections[nextIndex]) {
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 700);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isModalOpen, selectedImageIndex, currentPage]);

  if (currentPage !== 'main') {
    return (
      <div className="app-container page-view">
        <div className="page-container">
          <div className="back-btn" onClick={handleBackToMain}>
            Назад на главную
          </div>
          <div className="page-content">
            {currentPage === 'vector' && (
              <>
                <h1 className="main-title">Векторная Графика</h1>
                <p className="page-description">Примеры моих работ, созданных в Adobe Illustrator.</p>

                <div className="vector-grid">
                  {vectorWorks.map((work, index) => (
                    <div
                      key={work.id}
                      className="vector-card"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="vector-img-wrapper">
                        <img src={work.img} alt={work.title} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {currentPage === 'copywrite' && (
              <>
                <h1 className="main-title">Копирайтинг</h1>
                <p className="page-description">Документация, технические тексты и разработанные руководства пользователя.</p>

                <div className="vector-grid">
                  {copywritingWorks.map((work) => (
                    <div
                      key={work.id}
                      className="vector-card doc-card"
                      onClick={() => setSelectedPdf(work.file)}
                    >
                      <div className="vector-img-wrapper">
                        <img src={docIcon} alt="PDF Document" />
                      </div>
                      <span className="doc-card-title" style={{ marginTop: '15px' }}>{work.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* ОБНОВЛЕННАЯ ВКЛАДКА РЕКЛАМНЫХ КРЕАТИВОВ */}
            {currentPage === 'creative' && (
              <>
                <h1 className="main-title">Рекламные Креативы</h1>
                <p className="page-description">Разработка визуального контента, баннеров и промо-материалов.</p>

                <div className="vector-grid">
                  {creativeWorks.map((work, index) => (
                    <div
                      key={work.id}
                      className="vector-card"
                      onClick={() => setSelectedCreativeIndex(index)}
                    >
                      <div className="vector-img-wrapper">
                        <img src={work.img} alt={work.title} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {currentPage === 'video' && (
              <>
                <h1 className="main-title">Видеомонтаж</h1>
                <p className="page-description">Примеры видеороликов, монтажа и анимации.</p>

                <div className="vector-grid">
                  {videoWorks.map((work, index) => (
                    <div
                      key={work.id}
                      className="vector-card doc-card"
                      onClick={() => setSelectedVideoIndex(index)}
                    >
                      <div className="vector-img-wrapper">
                        <video 
                          src={work.file} 
                          className="video-preview" 
                          muted 
                          loop 
                          preload="metadata" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} 
                        />
                        <div className="play-button-overlay"></div>
                      </div>
                      <span className="doc-card-title" style={{ marginTop: '15px' }}>{work.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Модалка для Векторной графики */}
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

        {/* Модалка для Креативов (S7 и Portal) */}
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

        {/* Модалка для PDF */}
        {selectedPdf !== null && (
          <div className="pdf-modal-overlay" onClick={() => setSelectedPdf(null)}>
            <div className="pdf-modal-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedPdf(null)}>×</button>
              <iframe src={`${selectedPdf}#toolbar=1`} title="PDF Viewer" width="100%" height="100%" />
            </div>
          </div>
        )}

        {/* Модалка для Видео */}
        {selectedVideoIndex !== null && (
          <div className="image-modal-overlay" onClick={() => setSelectedVideoIndex(null)}>
            <button className="nav-arrow left-arrow" onClick={showPrevVideo}>‹</button>
            <div className="image-modal-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedVideoIndex(null)}>×</button>
              <video 
                key={videoWorks[selectedVideoIndex].file} 
                src={videoWorks[selectedVideoIndex].file} 
                controls 
                autoPlay
                style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)' }}
              />
            </div>
            <button className="nav-arrow right-arrow" onClick={showNextVideo}>›</button>
          </div>
        )}
      </div>
    );
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="snap-container" ref={containerRef}>

      <section className="snap-section" id="about-section">
        <div className="snap-trigger"></div>
        <div className="app-container">
          <header className="header-nav">
            <button className="nav-btn" onClick={() => scrollToSection('works-section')}>
              РАБОТЫ
            </button>
            <button className="nav-btn" onClick={() => setIsModalOpen(true)}>
              СВЯЗАТЬСЯ
            </button>
          </header>

          <h1 className="main-title">ПОРТФОЛИО</h1>
          <div className="arrow-down"></div>

          <div className="section-title">ОБО МНЕ</div>
          <div className="about-card">
            <p>Привет! Меня зовут Илья, мне 23 года. Я обладаю сильным техническим бэкграундом и 2 годами опыта создания контента.</p>
            <p>Моя главная ценность — умение самостоятельно закрывать весь цикл производства: от структурирования сложных текстов до полной отрисовки графики (Photoshop, Illustrator) и создания видео-контента (After Effects, CapCut и др.).</p>
            <p>Имею реальный опыт работы в продуктовых ИТ-командах: написал более 200 000 слов учебных материалов, разработал дизайн для 12 mini-игр, верстал на HTML и управлял версиями готового контента через GitLab.</p>
            <p>Быстро разбираюсь в логике сложных цифровых продуктов, эффективно использую ИИ для автоматизации рутины и создаю контент, который строго соответствует бренд-гайдам и решает задачи бизнеса.</p>
          </div>

          <div className="scroll-next-arrow" onClick={() => scrollToSection('works-section')}>↓</div>
        </div>
      </section>

      <section className="snap-section" id="works-section">
        <div className="snap-trigger"></div>
        <div className="app-container">
          <div className="section-title">РАБОТЫ</div>
          <div className="works-grid">
            <div className="work-card" onClick={() => setCurrentPage('vector')}>
              <h3>ВЕКТОРНАЯ ГРАФИКА</h3>
              <img src={aiIcon} alt="AI" className="icon-placeholder" />
            </div>

            <div className="work-card" onClick={() => setCurrentPage('copywrite')}>
              <h3>КОПИРАЙТИНГ</h3>
              <img src={docIcon} alt="DOC" className="icon-placeholder" />
            </div>

            <div className="work-card" onClick={() => setCurrentPage('creative')}>
              <h3>РЕКЛАМНЫЕ КРЕАТИВЫ</h3>
              <img src={psdIcon} alt="PSD" className="icon-placeholder" />
            </div>

            <div className="work-card" onClick={() => setCurrentPage('video')}>
              <h3>ВИДЕОМОНТАЖ</h3>
              <img src={aeIcon} alt="AE" className="icon-placeholder" />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <div className="section-title">СВЯЗАТЬСЯ</div>

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