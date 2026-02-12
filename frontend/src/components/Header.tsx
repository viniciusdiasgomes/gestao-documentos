import { motion } from "framer-motion";
import logoRMH from "../assets/LogoRMH.png";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-overlay" />

      <div className="header-content">
        <motion.img
          src={logoRMH}
          alt="Logo RMH"
          className="header-logo"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>
            Gestão de <span>Documentos</span>
          </h1>
          <p>Upload, organização e comentários em um só lugar</p>
        </motion.div>
      </div>
    </header>
  );
}