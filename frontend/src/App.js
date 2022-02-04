import './App.css';
import Header from './Shared/Header/Header';


function App({ children }) {

  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

export default App;
