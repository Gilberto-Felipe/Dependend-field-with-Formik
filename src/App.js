import React from 'react';
import AgeForm from './components/AgeForm';
import DependentForm from './components/DependentForm';
import DependentFormFactorizado from './components/DependentFormFactorizado';
import YupTransform from './components/YupTransform';
import './styles.css';

function App() {
    return (
        <>
            {/* <YupTransform /> */}
            {/* <AgeForm /> */}
            {/* <DependentForm /> */}
            <DependentFormFactorizado />
        </>
    );
}

export default App;