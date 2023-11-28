import {Navbar, Welcome, Transaction, Services, Footer} from "./components/index"
const App = ()=> {
  return (
    <>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <div>
        <Services />
        <Transaction />
        <Footer />
        
        </div>
      </div>
    </>
  );
}

export default App;
