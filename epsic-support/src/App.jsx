import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header.jsx'
import jsonData from "../../data.json"
import CreateShortcut from './CreateShortcut.jsx'
import CategoryManager from './CategoryManager.jsx'
import FlashMessage from './FlashMessage.jsx'
import ConfirmPopup from './Confirmpopup.jsx'
import FileAccessPopup from './FileAccessPopup.jsx'
import FileAccessBanner from './FileAccessBanner.jsx'
import { FaPen, FaTrash, FaFolder } from "react-icons/fa";


function App() {
  const [data, setData] = useState(jsonData);
  const [fileHandle, setFileHandle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [flash, setFlash] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [deletingLink, setDeletingLink] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(null);
  const [showFileAccessPopup, setShowFileAccessPopup] = useState(true);
  const [showFileAccessBanner, setShowFileAccessBanner] = useState(false);

const showFlash = (message, type = 'success') => {
    setFlash({ message, type });
    setTimeout(() => {
      setFlash(null);
    }, 3000);
  };

const connectToFile = async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'Fichier JSON de configuration',
          accept: { 'application/json': ['.json'] },
        }],
        multiple: false
      });

      setFileHandle(handle);
      setShowFileAccessPopup(false);
      setShowFileAccessBanner(false);
      const file = await handle.getFile();
      const text = await file.text();
      setData(JSON.parse(text));

      showFlash("Fichier connecté avec succès !", "success");
    } catch (err) {
      console.error("Annulation ou erreur:", err);
    }
  };

  const handleDismissPopup = () => {
    setShowFileAccessPopup(false);
    setShowFileAccessBanner(true);
  };


    const writeToFile = async (newData) => {
    if (!fileHandle) {
      const blob = new Blob([JSON.stringify(newData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "data.json";
      link.click();
      showFlash("Mode lecture seule : JSON téléchargé", "error");
      return;
    }

    try {

      const writable = await fileHandle.createWritable();

      await writable.write(JSON.stringify(newData, null, 2));

      await writable.close();
      showFlash("Sauvegarde réussie dans data.json", "success");
    } catch (err) {
      console.error(err);
      showFlash("Erreur lors de l'écriture", "error");
    }
  };

  const handleSaveLink = (linkData, targetCategory) => {
    let updatedData = [...data]; 

    if (editingLink) {
        updatedData = updatedData.map(section => {
            if (section.category === editingLink.category) {
               
                const newLinks = section.links.filter((_, idx) => idx !== editingLink.originalIndex);
                return { ...section, links: newLinks };
            }
            return section;
        });
    }

 
    updatedData = updatedData.map(section => {
      if (section.category === targetCategory) {
        return { ...section, links: [...section.links, linkData] };
      }
      return section;
    });

    setData(updatedData);
    writeToFile(updatedData);
    setIsModalOpen(false); 
    showFlash(editingLink ? "Lien modifié !" : "Lien ajouté !");
  };


  const categoriesList = data.map(s => s.category);

const handleEditClick = (e, link, category, index) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    setEditingLink({
      ...link,
      category,
      originalIndex: index 
    });
    
    setIsModalOpen(true);
  };


const handleDeleteLink = (e, categoryName, indexToDelete) => {
    e.preventDefault();
    e.stopPropagation();

    setConfirmPopup({
      title: 'Supprimer le lien',
      message: 'Voulez-vous vraiment supprimer ce lien définitivement ?',
      onConfirm: () => {
        const updatedData = data.map(section => {
          if (section.category === categoryName) {
            const newLinks = section.links.filter((_, i) => i !== indexToDelete);
            return { ...section, links: newLinks };
          }
          return section;
        });

        setData(updatedData);
        writeToFile(updatedData);
        showFlash("Lien supprimé avec succès", "success");
        setConfirmPopup(null);
      }
    });
  };

  const handleAddCategory = (categoryName) => {
    const exists = data.some(section => section.category.toLowerCase() === categoryName.toLowerCase());
    if (exists) {
      showFlash("Cette catégorie existe déjà", "error");
      return;
    }

    const newCategory = {
      category: categoryName,
      links: []
    };

    const updatedData = [...data, newCategory];
    setData(updatedData);
    writeToFile(updatedData);
    showFlash(`Catégorie "${categoryName}" ajoutée !`, "success");
  };

  const handleDeleteCategory = (categoryName) => {
    setConfirmPopup({
      title: 'Supprimer la catégorie',
      message: `Voulez-vous vraiment supprimer la catégorie "${categoryName}" et tous ses raccourcis ?`,
      onConfirm: () => {
        const updatedData = data.filter(section => section.category !== categoryName);
        setData(updatedData);
        writeToFile(updatedData);
        showFlash(`Catégorie "${categoryName}" supprimée !`, "success");
        setConfirmPopup(null);
      }
    });
  };

  return (
    <>
      <Header />

      {showFileAccessBanner && !fileHandle && (
        <FileAccessBanner
          onConnect={connectToFile}
          onClose={() => setShowFileAccessBanner(false)}
        />
      )}

      {flash && (
        <FlashMessage message={flash.message} type={flash.type} />
      )}
      <div style={{display: 'flex',flexDirection: 'column', marginBottom: '20px'}}>
        
<button 
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#003f87',
          color: 'white',
          fontSize: '30px',
          border: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Ajouter un raccourci"
      >
        +
      </button>

      <button 
        onClick={() => setIsCategoryModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '100px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#17a2b8',
          color: 'white',
          fontSize: '20px',
          border: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Gérer les catégories"
      >
        <FaFolder />
      </button>
      
        </div>
        {isModalOpen && (
        <CreateShortcut 
            availableCategories={categoriesList} 
            onAddLink={handleSaveLink}
            onClose={() => {
              setIsModalOpen(false);
              setEditingLink(null);
            }}
            initialData={editingLink}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryManager
          categories={categoriesList}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}

      {confirmPopup && (
        <ConfirmPopup
          title={confirmPopup.title}
          message={confirmPopup.message}
          onConfirm={confirmPopup.onConfirm}
          onCancel={() => setConfirmPopup(null)}
        />
      )}

      {showFileAccessPopup && !fileHandle && (
        <FileAccessPopup
          onConnect={connectToFile}
          onDismiss={handleDismissPopup}
        />
      )}

      <div className="main-container">
        {data.map((section, index) => (
          <div key={index} className="section-wrapper">
            <h2 className="section-title">{section.category}</h2>
            <div className="grid-container">
              {section.links.map((link, i) => (
                <a key={i} href={link.url} className="card-link" target="_blank">
                  <img src={link.logo} alt={link.name} className="card-logo" />
                  <span className="card-text">{link.name}</span>
                  <button className="delete-btn" onClick={(e) => handleDeleteLink(e, section.category, i)}><FaTrash size={12} /></button>
                  <button className="edit-btn" onClick={(e) => handleEditClick(e, link, section.category, i)}><FaPen size={12} /></button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App