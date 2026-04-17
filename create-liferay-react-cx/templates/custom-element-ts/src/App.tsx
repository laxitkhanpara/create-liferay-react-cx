import React from 'react';
import './assets/style.css';

function App(): React.ReactElement {
  return (
    <div className="lce-container">
      <div className="lce-card">
        <header className="lce-header">
          <h1 className="lce-title">__APP_NAME__</h1>
          <p className="lce-subtitle">
            React {React.version}
          </p>
        </header>
      </div>
    </div>
  );
}

export default App;
