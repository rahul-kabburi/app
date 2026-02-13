import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [noButtonPos, setNoButtonPos] = useState({});
  const [clickedCategories, setClickedCategories] = useState(new Set());

  // Button definitions based on user categories
  const categories = {
    'Yes': [
      { file: 'ofcourse.jpg' },
      { file: 'definately.jpg' },
      { file: 'haa.jpg' }
    ],
    'Maybe': [
      { file: 'formality.jpg' },
      { file: 'yawn.jpg' }
    ],
    'No': [
      { file: 'maybe.jpg' },
      { file: 'sony.jpg' }
    ],
    'Aint that girl': [
      { file: 'daya.jpg' },
      { file: 'aint_that_girl.jpg' },
      { file: 'hmm.jpg' }
    ],
    "I'm your valentine": [
      { file: 'koos.jpg' }
    ]
  };

  const isNoUnlocked = clickedCategories.has('Yes') &&
    clickedCategories.has('Maybe') &&
    clickedCategories.has('Aint that girl') &&
    clickedCategories.has("I'm your valentine");

  // Import a romantic font from Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Quicksand:wght@600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    setClickedCategories(prev => new Set(prev).add(catName));
  };

  const handleNoHover = () => {
    if (isNoUnlocked) return; // Don't run away if unlocked

    // Current "No" button runaway logic
    const randomX = Math.floor(Math.random() * 75) + 10;
    const randomY = Math.floor(Math.random() * 75) + 10;

    setNoButtonPos({
      position: 'fixed',
      top: `${randomY}vh`,
      left: `${randomX}vw`,
      transition: 'all 0.2s ease-in-out',
      zIndex: 100
    });
  };

  return (
    <div className="romantic-container">
      <div className="main-content">
        <h1 className="title">Will you be my Valentine?</h1>

        {/* Horizontal Category Buttons */}
        <div className="main-button-group">
          {Object.keys(categories).map((catName) => (
            <button
              key={catName}
              className={`btn category-btn ${catName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-btn ${catName === 'No' && !isNoUnlocked ? 'runaway' : ''}`}
              onClick={() => handleCategoryClick(catName)}
              onMouseEnter={catName === 'No' ? handleNoHover : null}
              style={catName === 'No' && !isNoUnlocked ? noButtonPos : {}}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Unlock hint for the user */}
        {!isNoUnlocked && activeCategory !== 'No' && (
          <div className="unlock-hint"></div>
        )}

        {/* Display Area for Active Category Images */}
        <div className="response-gallery">
          {activeCategory && categories[activeCategory].map((item, index) => (
            <div key={index} className="media-wrapper">
              <img
                src={`${import.meta.env.BASE_URL}${item.file}`}
                className="response-media"
                alt={`${activeCategory} reaction ${index}`}
              />
            </div>
          ))}
          {!activeCategory && (
            <div className="placeholder-text"></div>
          )}
        </div>
      </div>
    </div>
  );
}