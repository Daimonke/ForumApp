import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Context from "./Context";
import Index from "./pages/Index";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Index />
        <Footer />
      </BrowserRouter>
    </Context>
  );
}

export default App;
