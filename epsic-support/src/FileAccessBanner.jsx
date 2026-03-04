import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaFolder, FaTimes } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import './FileAccessBanner.css';

function FileAccessBanner({ onConnect, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 350);
  };

  return createPortal(
    <div className={`file-access-banner${isClosing ? ' closing' : ''}`}>
      <div className="banner-content">
        <div className="banner-icon">
          <FiAlertTriangle />
        </div>
        <div className="banner-text">
          <strong>Mode lecture seule</strong> - Autorisez l'accès au fichier pour sauvegarder directement vos modifications
        </div>
        <button className="banner-btn-connect" onClick={onConnect}>
          <FaFolder /> Donner les droits
        </button>
        <button className="banner-btn-close" onClick={handleClose} title="Fermer">
          <FaTimes />
        </button>
      </div>
    </div>,
    document.body
  );
}

export default FileAccessBanner;
