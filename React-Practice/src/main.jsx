import { createRoot } from "react-dom/client";
import "./index.css"
import Route from "./routes/Routes";
import { ProductContextProvider } from "./context/ProductContext";

createRoot(document.getElementById("root")).render(<ProductContextProvider><Route/></ProductContextProvider>);