import { HashRouter } from "react-router-dom";
import Context from "./context/Context";
import Index from "./layout/Index";

function App() {
  return (
    <Context>
      {/* HashRouter for Github-pages and package.json "proxy" bug */}
      <HashRouter>
        <Index />
      </HashRouter>
    </Context>
  );
}

export default App;
