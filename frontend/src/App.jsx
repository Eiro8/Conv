import { useState } from 'react';

import './App.css';
import Converter from './pages/Convert/Converter';
import Footer from './components/layout/Footer/footer';
import Navbar from './components/layout/Navbar/Navbar';
import TitleBar from './components/layout/TitleBar/TitleBar';

function App() {
    const activeTool = "Converter"
    const appIcon = ""
    const appName = "CONV"
    
    return (<>
        <TitleBar activeTool={activeTool} appIcon={appIcon} appName={appName} />
        <Navbar />
        <Converter />
        <Footer />
    </>
    )
}

export default App