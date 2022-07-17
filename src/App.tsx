import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context";
import Index from "./layout/Index";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </Context>
  );
}

export default App;
