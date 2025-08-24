// src/appwrite/createCard.js
import { Client, Databases, Storage, ID } from "appwrite";

export default async function createCard(formData) {
  try {
    // 🔗 Init client
    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

    const databases = new Databases(client);
    const storage = new Storage(client);

    // Your IDs
    const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
    const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID; 

    // 1️⃣ Upload images to bucket
    const uploadedUrls = [];
    for (let i = 0; i < formData.memories.length; i++) {
      const memory = formData.memories[i];

      if (memory.file) {
        const fileRes = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          memory.file
        );
        console.log("✅ File uploaded:", fileRes);
        

        // public URL (if bucket allows read)
        const fileUrl = storage.getFileView(BUCKET_ID, fileRes.$id);
        console.log(`✅ Image ${i + 1} uploaded:`, fileUrl);
        uploadedUrls.push(fileUrl);
      }
    }

    console.log("✅ Images uploaded:", uploadedUrls);
    // 2️⃣ Prepare image descriptions
    const descriptions = formData.memories.map(m => m.caption || "");

    // 3️⃣ Create DB document
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        name: formData.customerName,
        recipient: formData.recipientName,
        mobile: formData.customerNumber,
        PIN: formData.pin,
        song_link: formData.links.song || null,
        movie_link: formData.links.movie || null,
        other_link: formData.links.other || null,
        image_descriptions: descriptions,
        image_paths: uploadedUrls,
      }
    );

    console.log("✅ Card created:", doc);
    return { success: true, doc };

  } catch (error) {
    console.error("❌ Error creating card:", error.message);
    return { success: false, error: error.message };
  }
}
