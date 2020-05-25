import React from 'react';
import SortingVisualizer from './sortingVisualizer/sortingVisualizer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer> {/*creates a sortingVisualizer object/element in this div*/}
    </div>
  );
}

export default App;
