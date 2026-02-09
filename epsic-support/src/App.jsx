import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header.jsx'
import jsonData from "../../data.json"

function App() {
  const [data, setData] = useState(jsonData);

  console.log(data);

  return (
    <>
      <Header />
      <div className="main-container">
        {data.map((section, index) => (
          <div key={index} className="section-wrapper">
            <h2 className="section-title">{section.category}</h2>
            <div className="grid-container">
              {section.links.map((link, i) => (
                <a key={i} href={link.url} className="card-link" target="_blank">
                  <img src={link.logo} alt={link.name} className="card-logo" />
                  <span className="card-text">{link.name}</span>
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