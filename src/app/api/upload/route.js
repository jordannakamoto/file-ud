// pages/api/upload.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from 'stream';
import { promisify } from 'util';

// Promisify the pipeline function for use with async/await
const streamPipeline = promisify(pipeline);


export const config = {
  api: {
    bodyParser: false, // Disables the default Next.js body parser
  },
};

export async function POST(request) {
  const formData = await request.formData()
  try {
  const File = formData.get('file');
  if (!File) {
    return NextResponse.json(null, { status: 400 })
  }
      // Assuming a single file upload, get the file object
      console.log(File);
      // Define the path for the saved file
      const filePath = path.join(
        process.cwd(),
        "public",
        "myfiles",
        File.name
      );
      // Move the file from the temporary directory to the target directory
      await streamPipeline(File.stream(), fs.createWriteStream(filePath));
      return NextResponse.json(
        {
          message: "File uploaded successfully",
          filePath: `/myfiles/${File.name}`,
        },
        { status: 200 }
      );
  } catch (error) {
    console.error("Failed to upload file:", error);
    // Respond with an error message
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json(
    { message: "get route at /upload" },
    { status: 200 }
  );
}
