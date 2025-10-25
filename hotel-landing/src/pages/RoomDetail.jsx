import React from 'react';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalle de Habitación</h1>
      <p>Información detallada de la habitación ID: {id}</p>
      <div>
        <h2>Características de la habitación:</h2>
        <ul>
          <li>Capacidad: 2-4 personas</li>
          <li>WiFi gratuito</li>
          <li>TV de pantalla plana</li>
          <li>Minibar</li>
          <li>Vista al mar</li>
        </ul>
      </div>
    </div>
  );
};

export default RoomDetail;
