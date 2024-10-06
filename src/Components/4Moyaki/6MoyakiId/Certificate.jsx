/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import certificate from '../../../assets/moyaki-certificate.jpg';
import ConfirmationModal from './ConfirmationModal';
import Loading from './Loading'; // Import the Loading component
import './Certificate.css';

const Certificate = ({ name }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [downloadType, setDownloadType] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const downloadCertificateAsPDF = () => {
    const input = document.getElementById("certificate");

    html2canvas(input, {
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = 210;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${name}_Certificate.pdf`);

      setIsLoading(false); // Stop loading once the PDF is saved
    });
  };

  const downloadCertificateAsPNG = () => {
    const input = document.getElementById("certificate");

    html2canvas(input, {
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${name}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsLoading(false); // Stop loading after PNG download
    });
  };

  const handleDownloadClick = (type) => {
    setDownloadType(type);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false); // Close the modal immediately
    setIsLoading(true); // Start loading when the user confirms

    // Add a delay of 2 seconds before proceeding with the download
    setTimeout(() => {
      if (downloadType === 'PDF') {
        downloadCertificateAsPDF();
      } else if (downloadType === 'PNG') {
        downloadCertificateAsPNG();
      }
    }, 2000); // 2-second delay for loading
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {isLoading && <Loading />} {/* Show loading component when downloading */}

      <div id="certificate" className="certificate-container">
        <img src={certificate} alt="Certificate Background" className="certificate-background" />
        <div className="certificate-content">
          <h1 className="certificate-name">{name}</h1>
        </div>
      </div>

      <button onClick={() => handleDownloadClick('PDF')} className="btn download-btn">
        Download Certificate as PDF
      </button>

      <button onClick={() => handleDownloadClick('PNG')} className="btn download-btn">
        Download Certificate as PNG
      </button>

      <ConfirmationModal 
        isOpen={isModalOpen} 
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
        name={name}
      />
    </div>
  );
};

export default Certificate;
