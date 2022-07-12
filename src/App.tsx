import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Context from "./Context";
import Index from "./pages/Index";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Index />
        <Footer />
      </BrowserRouter>
    </Context>
  );
}

export default App;
