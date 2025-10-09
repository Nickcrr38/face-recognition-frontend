import React from 'react';
import './imagelinkform.css'; // same CSS file as before

const ImageUploadForm = ({ onFileUpload }) => {
  return (
    <div className="image-upload-form">
      <p className="instruction">
        Upload an image and the Magic Brain will detect faces!
      </p>

      <div className="form-container">
        <input
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="upload-btn"
        />
      </div>
    </div>
  );
};

export default ImageUploadForm;






