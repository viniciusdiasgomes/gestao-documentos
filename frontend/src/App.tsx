import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Upload from "./pages/Upload";
import DocumentDetails from "./pages/DocumentDetails";
import Header from "./components/Header";
import EditDocument from "./pages/EditDocument";
import NotFound from "./pages/NotFound";


export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentDetails />} /> {/* 👈 ESSENCIAL */}
        <Route path="/upload" element={<Upload />} />
        <Route
  path="/documents/:id/edit"
  element={<EditDocument />}
/>
<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}