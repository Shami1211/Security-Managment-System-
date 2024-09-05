import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DownloadReceipt = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const downloadReceipt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payments/${paymentId}/receipt`, {
          responseType: 'blob', // Important for handling PDF download
        });

        // Create a URL for the blob and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `receipt_${paymentId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Optionally, navigate to another page or show a message
        navigate('/'); // Redirect to home or another page
      } catch (error) {
        console.error('Error downloading receipt:', error);
      }
    };

    downloadReceipt();
  }, [paymentId, navigate]);

  return (
    <div>
      <p>Downloading receipt...</p>
    </div>
  );
};

export default DownloadReceipt;
