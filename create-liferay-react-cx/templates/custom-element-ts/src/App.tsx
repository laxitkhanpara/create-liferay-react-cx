import './assets/style.css';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="lce-container">
      <div className="lce-card">
        <header className="lce-header">
          <h1 className="lce-title">__APP_NAME__</h1>
          <p className="lce-subtitle">
            Successfully deployed as a Liferay Client Extension.
          </p>
        </header>
      </div>
    </div>
  );
};

export default App;
