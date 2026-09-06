import React from 'react';
import './PortfolioScrollIndicator.scss';

/**
 * PortfolioScrollIndicator
 *
 * Показывает прогресс по snap-секциям портфолио.
 * Выглядит как стеклянная кнопка с вертикальным треком и номером.
 *
 * Props:
 *   total         — общее кол-во секций
 *   current       — индекс текущей секции (0-based)
 *   visible       — показывать ли индикатор (bool)
 *   onDotClick    — (index) => void  — клик по «доту» прокручивает к секции
 *   sectionTitles — ['Hero', 'About', ...] — подписи (опционально)
 */
const PortfolioScrollIndicator = ({ total, current, visible, onDotClick, sectionTitles = [] }) => {
  if (!visible) return null;

  const progress = total > 1 ? current / (total - 1) : 0;

  return (
    <div className="psi-wrap" aria-label="Навигация по разделам">
      {/* Стеклянная кнопка-трек */}
      <div className="psi-card">
        {/* Трек */}
        <div className="psi-track">
          {/* Активная полоса */}
          <div
            className="psi-track-fill"
            style={{ height: `${progress * 100}%` }}
          />
          {/* Точки-доты для каждой секции */}
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`psi-dot ${i === current ? 'active' : ''}`}
              style={{ top: `${(i / (total - 1)) * 100}%` }}
              onClick={() => onDotClick && onDotClick(i)}
              title={sectionTitles[i] || `Секция ${i + 1}`}
              aria-label={sectionTitles[i] || `Секция ${i + 1}`}
            />
          ))}
        </div>

        {/* Счётчик */}
        <span className="psi-count">
          {String(current + 1).padStart(2, '0')}
          <span className="psi-count-total">/{String(total).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Всплывающая подпись текущей секции (если переданы заголовки) */}
      {sectionTitles[current] && (
        <div className="psi-label">{sectionTitles[current]}</div>
      )}
    </div>
  );
};

export default PortfolioScrollIndicator;
