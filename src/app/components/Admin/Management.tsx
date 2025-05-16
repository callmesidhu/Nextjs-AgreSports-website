"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image_url: string;
  createdAt?: any;
}

const Management = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const members: TeamMember[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TeamMember, "id">),
      }));
      setTeam(members);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !position || !description || !imageUrl) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "team"), {
        name,
        position,
        description,
        image_url: imageUrl,
        createdAt: serverTimestamp(),
      });
      setName("");
      setPosition("");
      setDescription("");
      setImageUrl("");
    } catch (err: any) {
      alert("Error adding member: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await deleteDoc(doc(db, "team", id));
    } catch (err: any) {
      alert("Error deleting member: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-white">
      <h1 className="text-4xl font-bold mb-8">Team Management</h1>

      <form
        onSubmit={handleAdd}
        className="bg-gray-800 p-6 rounded-lg shadow-md mb-10 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            className="bg-white text-black px-4 py-2 rounded-md w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            className="bg-white text-black px-4 py-2 rounded-md w-full"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="bg-white text-black px-4 py-2 rounded-md w-full sm:col-span-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Description"
          className="bg-white text-black px-4 py-2 rounded-md w-full"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Add Team Member
        </button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading team members...</p>
      ) : team.length === 0 ? (
        <p className="text-gray-400">No team members yet.</p>
      ) : (
        <ul className="space-y-6">
          {team.map(({ id, name, position, description, image_url }) => (
            <li
              key={id}
              className="bg-gray-800 p-6 rounded-md shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={image_url}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-sm text-gray-400 italic">{position}</p>
                  <p className="text-gray-300">{description}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-medium self-start sm:self-auto"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Management;
