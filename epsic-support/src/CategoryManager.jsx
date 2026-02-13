import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './CategoryManager.css';

function CategoryManager({ categories, onAddCategory, onDeleteCategory, onClose }) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  const handleDelete = (categoryName) => {
    onDeleteCategory(categoryName);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="section-title">Gérer les catégories</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="category-manager-content">
          <form onSubmit={handleSubmit} className="add-category-form">
            <div className="form-group">
              <label>Nouvelle catégorie</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nom de la catégorie"
                  required
                />
                <button type="submit" className="add-category-btn">
                  Ajouter
                </button>
              </div>
            </div>
          </form>

          <div className="categories-list">
            <h3>Catégories existantes</h3>
            {categories.length === 0 ? (
              <p className="no-categories">Aucune catégorie</p>
            ) : (
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="category-item">
                    <span className="category-name">{category}</span>
                    <button 
                      className="delete-category-btn"
                      onClick={() => handleDelete(category)}
                      title="Supprimer cette catégorie"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;
