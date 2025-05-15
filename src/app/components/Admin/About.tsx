"use client";

import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase"; 

const About = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const aboutCollectionRef = collection(db, "about");

  // Fetch all image URLs from Firestore
  const fetchImages = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(aboutCollectionRef);
      const imgs: { id: string; url: string }[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
      }));
      setImages(imgs);
    } catch (err) {
      setError("Failed to fetch images");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Add new image URL to Firestore
  const handleAddImage = async () => {
    if (!imageUrl.trim()) {
      setError("Please enter a valid image URL");
      return;
    }
    try {
      await addDoc(aboutCollectionRef, { url: imageUrl.trim() });
      setImageUrl("");
      fetchImages(); // Refresh list
      setError("");
    } catch (err) {
      setError("Failed to add image");
      console.error(err);
    }
  };

  // Delete image URL by document id
  const handleDeleteImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "about", id));
      fetchImages(); // Refresh list
    } catch (err) {
      setError("Failed to delete image");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Admin Panel</h1>
      <p className="mb-6">
        Manage the images displayed in the About section by adding URLs here.
      </p>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter image URL"
          className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 text-white"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          onClick={handleAddImage}
          className="px-6 py-2 bg-violet-600 text-white rounded-r-md hover:bg-violet-700 transition"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p>No images added yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map(({ id, url }) => (
            <li key={id} className="bg-gray-800 p-4 rounded-md relative">
              <img src={url} alt="About Section" className="w-full h-40 object-cover rounded-md mb-2" />
              <button
                onClick={() => handleDeleteImage(id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <p className="break-words text-sm">{url}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default About;
