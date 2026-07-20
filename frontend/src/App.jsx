import { useState } from 'react';

import './App.css';
import Converter from './pages/Convert/Converter';
import Footer from './components/layout/Footer/footer';
import Navbar from './components/layout/Navbar/Navbar';
import TitleBar from './components/layout/TitleBar/TitleBar';

function App() {
    const activeTool = "Conversor de Imagens"
    const appIcon = ""
    const appName = "conv"

    return (<div class="app-content">
        <TitleBar appIcon={appIcon} appName={appName} />
        <Navbar currentTool={activeTool} />
        <Converter />
        <Footer />
    </div>
    )
}

export default App