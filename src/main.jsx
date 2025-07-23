import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
    <BrowserRouter >
    <App />
    <ToastContainer position="top-right"  autoClose={2000}/>
    </BrowserRouter>
    </Provider>

)
