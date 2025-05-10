import React, { useState, useEffect } from 'react';
import socios from './mock/socios';
import TaxiHeader from './components/TaxiHeader';
import TaxiSocioList from './components/TaxiSocioList';
import TaxiSocioDetail from './components/TaxiSocioDetail';
import TaxiSocioForm from './components/TaxiSocioForm';

const App = () => {
  const [sociosData, setSociosData] = useState(socios);
  const [selectedSocio, setSelectedSocio] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('taxiSocios');
    if (savedData) {
      setSociosData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taxiSocios', JSON.stringify(sociosData));
  }, [sociosData]);

  const handleAddAportacion = (nuevaAportacion) => {
    setSociosData(prev => prev.map(socio => {
      if (socio.id === nuevaAportacion.socioId) {
        return {
          ...socio,
          aportaciones: [...socio.aportaciones, {
            fecha: nuevaAportacion.fecha,
            monto: nuevaAportacion.monto,
            tipo: nuevaAportacion.tipo,
            comprobante: nuevaAportacion.comprobante
          }]
        };
      }
      return socio;
    }));
  };

  const handleAddSocio = (nuevoSocio) => {
    setSociosData(prev => [...prev, { 
      ...nuevoSocio, 
      id: Date.now(),
      vehiculo: null,
      aportaciones: [] 
    }]);
  };

  const handleSaveVehiculo = (socioId, vehiculoData) => {
    setSociosData(prev => prev.map(socio => {
      if (socio.id === socioId) {
        return {
          ...socio,
          vehiculo: vehiculoData
        };
      }
      return socio;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TaxiHeader />
      
      <main className="container mx-auto p-4">
        {selectedSocio ? (
          <TaxiSocioDetail 
            socio={selectedSocio} 
            onAddAportacion={handleAddAportacion}
            onSaveVehiculo={handleSaveVehiculo}
            onBack={() => setSelectedSocio(null)}
          />
        ) : (
          <>
            <TaxiSocioForm onAddSocio={handleAddSocio} />
            <TaxiSocioList 
              socios={sociosData} 
              onSelectSocio={setSelectedSocio} 
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;

// DONE