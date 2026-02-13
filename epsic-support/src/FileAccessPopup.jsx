import { FaFolder } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import './FileAccessPopup.css';

function FileAccessPopup({ onConnect, onDismiss }) {
  return (
    <div className="file-access-overlay" onClick={onDismiss}>
      <div className="file-access-modal" onClick={(e) => e.stopPropagation()}>
        <div className="file-access-icon">
          <FiAlertTriangle />
        </div>
        <h3 className="file-access-title">Autorisation requise</h3>
        <p className="file-access-message">
          Pour que la sauvegarde fonctionne, vous devez autoriser l'accès au fichier data.json. Sinon vous allez télecharger un fichier à chaque sauvegarde. Vous pourrez toujours changer d'avis plus tard dans les paramètres.
        </p>
        <div className="file-access-buttons">
          <button className="file-access-btn dismiss" onClick={onDismiss}>
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
