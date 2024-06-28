import React from 'react';
import Chat from './chat'; 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Forest Connect</h1>
        <Chat /> {/* Using the chat component */}
      </header>
    </div>
  );
}

export default App;
