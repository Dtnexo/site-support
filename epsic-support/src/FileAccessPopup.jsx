import { useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import './FileAccessPopup.css';

function FileAccessPopup({ onConnect, onDismiss }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => onDismiss(), 300);
  };

  return (
    <div className={`file-access-overlay${isClosing ? ' closing' : ''}`} onClick={handleDismiss}>
      <div className={`file-access-modal${isClosing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="file-access-icon">
          <FiAlertTriangle />
        </div>
        <h3 className="file-access-title">Autorisation requise</h3>
        <p className="file-access-message">
          Pour que la sauvegarde fonctionne, vous devez autoriser l'accès au fichier data.json. Sinon vous allez télecharger un fichier à chaque sauvegarde. Vous pourrez toujours changer d'avis plus tard dans les paramètres.
        </p>
        <div className="file-access-buttons">
          <button className="file-access-btn dismiss" onClick={handleDismiss}>
            Plus tard
          </button>
          <button className="file-access-btn connect" onClick={onConnect}>
            <FaFolder /> Sélectionner le fichier
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileAccessPopup;
