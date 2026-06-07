import { useEffect, useState } from 'react';
import { getConsultations, updateConsultationStatus } from '../api/adminApi';

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);

  const loadConsultations = async () => {
    const response = await getConsultations();
    setConsultations(response.data);
  };

  const changeStatus = async (id, status) => {
    await updateConsultationStatus(id, status);
    loadConsultations();
  };

  useEffect(() => {
    loadConsultations();
  }, []);

  return (
    <div>
      <h1 className="page-title">Consultations</h1>

      {consultations.map(item => (
        <div key={item.id} className="card">
          <h3>{item.patientName}</h3>
          <p>User: {item.userEmail}</p>
          <p>Phone: {item.phone}</p>
          <p>Concern: {item.concern}</p>
          <p>Date: {item.preferredDate}</p>
          <p>Time: {item.preferredTime}</p>
          <p>Status: <b>{item.status}</b></p>

          <button className="btn btn-green">Confirm</button>
<button className="btn btn-gold">Complete</button>
<button className="btn btn-red">Cancel</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
};