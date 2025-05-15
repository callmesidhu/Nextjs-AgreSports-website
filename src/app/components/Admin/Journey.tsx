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
} from "firebase/firestore";

interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
}

const Journey = () => {
  const [journey, setJourney] = useState<JourneyMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const q = query(collection(db, "journey"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const milestones: JourneyMilestone[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<JourneyMilestone, "id">),
      }));
      setJourney(milestones);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "journey"), {
        title,
        description,
        date,
      });
      setTitle("");
      setDescription("");
      setDate("");
    } catch (err: any) {
      alert("Error adding milestone: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this milestone?")) return;
    try {
      await deleteDoc(doc(db, "journey", id));
    } catch (err: any) {
      alert("Error deleting milestone: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-white">
      <h1 className="text-4xl font-bold mb-8">Team Journey</h1>

      <form
        onSubmit={handleAdd}
        className="bg-gray-800 p-6 rounded-lg shadow-md mb-10 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            className="bg-white text-black px-4 py-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date (e.g., Jan 2023, Late 2024)"
            className="bg-white text-black px-4 py-2 rounded-md w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          className="bg-violet-600 hover:bg-viloet-700 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Add Milestone
        </button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading journey...</p>
      ) : journey.length === 0 ? (
        <p className="text-gray-400">No journey milestones yet.</p>
      ) : (
        <ul className="space-y-6">
          {journey.map(({ id, title, description, date }) => (
            <li
              key={id}
              className="bg-gray-800 p-6 rounded-md shadow-md flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-gray-300 mb-1">{description}</p>
                <p className="text-sm text-gray-400 italic">{date}</p>
              </div>
              <button
                onClick={() => handleDelete(id)}
                className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-medium"
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

export default Journey;
