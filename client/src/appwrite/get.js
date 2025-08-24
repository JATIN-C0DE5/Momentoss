// src/appwrite/get.js
import { Client, Databases } from "appwrite";

export default async function getGiftCard(uuid, pin) {
  try {
    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // ✅ from .env
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    const databases = new Databases(client);

    const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

    console.log("Authenticating user:", uuid, pin);

    // fetch doc by id
    const userDoc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      uuid
    );

    if (userDoc.PIN !== pin) {
      return { authenticated: false };
    } else {
      return { authenticated: true, doc: userDoc };
    }
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return { authenticated: false, error: error.message };
  }
}
