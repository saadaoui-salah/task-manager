import './App.css';
import Header from './Shared/Header/Header';


function App({ children }) {
  const token = localStorage.getItem('token')

  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

export default App;
