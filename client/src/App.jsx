import { useContext } from "react";
import {Navbar, Welcome, Transaction, Services, Footer} from "./components/index"
import { TransactionContext } from "./context/TransactionContext";
const App = ()=> {
  
  const { isDarkTheme } = useContext(TransactionContext);
  return (
    <>
      <div className="min-h-screen">
        <div className={`${isDarkTheme ? "dark-theme" : " gradient-bg-welcome"}`}>
          <Navbar />
          <Welcome />
        <Services />
        <Transaction />
        </div>
        <div className={`${isDarkTheme ? "dark-theme" : "gradient-bg-transactions"}`}>
        <Footer />
        
        </div>
      </div>
    </>
  );
}

export default App;
