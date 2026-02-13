import { FaExclamationTriangle } from 'react-icons/fa';
import './Confirmpopup.css';

function ConfirmPopup({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <FaExclamationTriangle />
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-btn cancel" onClick={onCancel}>
            Annuler
          </button>
          <button className="confirm-btn delete" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;