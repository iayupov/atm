import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TypesPage from './TypesPage'
import './styles.css'
import './types.css'

const isTypesPage=window.location.pathname==='/types'||window.location.pathname.startsWith('/types/')
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{isTypesPage?<TypesPage/>:<App/>}</React.StrictMode>)
