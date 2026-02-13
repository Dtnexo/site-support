import { FaFolder, FaTimes } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import './FileAccessBanner.css';

function FileAccessBanner({ onConnect, onClose }) {
  return (
    <div className="file-access-banner">
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
        <button className="banner-btn-close" onClick={onClose} title="Fermer">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default FileAccessBanner;
