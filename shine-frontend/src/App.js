import './App.css';
import Header from "./components/Header";
import RouteWrapper from "./config/routing";

function App() {
  return (
    <div className="App">
        <Header />
        <RouteWrapper />
    </div>
  );
}

export default App;
