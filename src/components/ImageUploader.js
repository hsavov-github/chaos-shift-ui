import React, { useState } from 'react';

const ImageUploader = ({sharedImage, onImageChange}) => {
  return (
    <div>
      <input type="file" onChange={(e) => onImageChange(e)} />
    </div>
  );
};

export default ImageUploader;
