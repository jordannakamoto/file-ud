'use client'

import Dropzone from 'react-dropzone'
import Image from "next/image";
import RF from '@/components/ReactFlow/RF'
import React from 'react'

export default function Home() {
  const handleFileDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    // Perform file operations here
    // For example, uploading to a server, reading the file contents, etc.
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

