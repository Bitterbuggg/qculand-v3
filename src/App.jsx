import React from 'react';
import CampusMap from './components/scenes/CampusMap/CampusMap';

export default function App() {
    const handleEnterBuilding = (buildingId) => {
        // TODO: Implement building interior scenes
        console.log(`Entering building: ${buildingId}`);
        alert(`Building "${buildingId}" interior not implemented yet!`);
    };

    return (
        <div style={{ width: '100%', height: '100vh', background: '#1a1a2e' }}>
            <CampusMap onEnterBuilding={handleEnterBuilding} />
        </div>
    );
}
