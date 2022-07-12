import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Context from "./Context";
import Index from "./pages/Index";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Index />
      </BrowserRouter>
    </Context>
  );
}

export default App;
