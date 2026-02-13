import { useState, useEffect } from 'react';
import { FaLink, FaUpload } from 'react-icons/fa';
import './CreateShortcut.css';
import { FiAlertTriangle } from "react-icons/fi";

function CreateShortcut({ availableCategories = [], onAddLink, onClose,initialData = null }) {
  
const [formData, setFormData] = useState({
    name: '',
    url: '',
    logo: '',
    category: availableCategories[0] || '',
    previewUrl: ''
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (initialData) {
      
      setFormData({
        name: initialData.name,
        url: initialData.url,
        logo: initialData.logo,
        category: initialData.category, 
        previewUrl: initialData.logo 
      });
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result,
          previewUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

useEffect(() => {
    if (!formData.logo && formData.url.includes('.')) {
      setFormData(prev => ({ 
        ...prev, 
        previewUrl: `https://www.google.com/s2/favicons?domain=${formData.url}&sz=128` 
      }));
    }
  }, [formData.url, formData.logo]);

const handleSubmit = (e) => {
    e.preventDefault();
    let finalLogo = formData.logo;
    
    if (!finalLogo && formData.url) {
        finalLogo = `https://www.google.com/s2/favicons?domain=${formData.url}&sz=128`;
    }

    const newLink = {
        name: formData.name,
        url: formData.url,
        logo: finalLogo 
    };

    if (onAddLink) {
        onAddLink(newLink, formData.category);
    }
    if (onClose) {
        onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
            <h2 className="section-title">{initialData ? `Modification de "${initialData.name}"` : "Nouveau Raccourci"}</h2>
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="form-wrapper-popup">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Catégorie</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                        {availableCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>URL</label>
                    <input type="url" name="url" value={formData.url} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Logo</label>
                    <div className="file-upload-wrapper">
                        <input type="file" id="logo-upload" accept="image/*" onChange={handleFileChange} />
                        <label htmlFor="logo-upload" className="file-upload-label">
                            <FaUpload/>
                            <span className={`file-upload-text ${fileName ? 'has-file' : ''}`} style={{paddingLeft:'10px'}}>
                                {fileName || 'Choisir une image...'}
                            </span>
                        </label>
                    </div>
                </div>

                <button type="submit" className="submit-btn">{initialData ? "Sauvegarder les modifications" : "Ajouter"}</button>
            </form>

            <div className="preview-mini">
                <p>Aperçu :</p>
                <div className="card-link preview-card-mini">
                    {formData.previewUrl ? <img src={formData.previewUrl} className="card-logo" /> : <FaLink />}
                    <span>{formData.name || "..."}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreateShortcut;