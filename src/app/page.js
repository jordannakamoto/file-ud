'use client'

import Dropzone from 'react-dropzone'
import Image from "next/image";
import RF from '@/components/ReactFlow/RF'
import React from 'react'

export default function Home() {
  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming single file upload
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error uploading the file:', error));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Dropzone onDrop={handleFileDrop}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <RF/>
          </div>
        </section>
      )}
    </Dropzone>

    </main>
  );
}

