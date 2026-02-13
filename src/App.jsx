// Valentine App - Protected 
import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [noButtonPos, setNoButtonPos] = useState({});
  const [clickedCategories, setClickedCategories] = useState(new Set());

  const categories = {
    'Yes': [
      { file: 'definately.jpg' },

    ],
    'Maybe': [
      { file: 'formality.jpg' },
      { file: 'yawn.jpg' },
      { file: 'haa.jpg' }
    ],
    'No': [
      { file: 'no.jpg' },
      { file: 'naah.jpg' }
    ],
    'Aint that girl': [
      { file: 'aint_that_girl.jpg' },
      { file: 'hmm.jpg' },
      { file: 'daya.jpg' }
    ],
    "I'm your valentine": [
      { file: 'sony.jpg' }
    ]
  };

  const isNoUnlocked = clickedCategories.has('Yes') &&
    clickedCategories.has('Maybe') &&
    clickedCategories.has('Aint that girl') &&
    clickedCategories.has("I'm your valentine");

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Quicksand:wght@600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'koosie') {
      setIsAuthorized(true);
    } else {
      alert('Wrong code! Try again ❤️');
    }
  };

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    setClickedCategories(prev => new Set(prev).add(catName));
  };

  const handleNoHover = () => {
    if (isNoUnlocked) return;

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

  if (!isAuthorized) {
    return (
      <div className={`romantic-container ${!isAuthorized ? 'plain-bg' : ''}`}>
        <div className="login-box">
          <h2 className="login-title">Enter password</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Secret Code"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn login-btn">Unlock</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="romantic-container">
      <div className="main-content">
        <h1 className="title">Will you be my Valentine?</h1>

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

        {!isNoUnlocked && activeCategory !== 'No' && (
          <div className="unlock-hint"></div>
        )}

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