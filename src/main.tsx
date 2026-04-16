import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Dark-first: força tema escuro como padrão da aplicação
document.documentElement.classList.add("dark");
document.documentElement.style.colorScheme = "dark";

createRoot(document.getElementById("root")!).render(<App />);
