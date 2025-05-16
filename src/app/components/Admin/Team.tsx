import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

type FormDataType = {
  role: string;
  name: string;
  description: string;
  image_url: string;
  discord_url: string;
  youtube_url: string;
  instagram_url: string;
};

type TeamMember = FormDataType & {
  id: string;
  createdAt?: any;
};

const initialFormData: FormDataType = {
  role: "",
  name: "",
  description: "",
  image_url: "",
  discord_url: "",
  youtube_url: "",
  instagram_url: "",
};

const Teams: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<"L1" | "L2">("L1");
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [members, setMembers] = useState<TeamMember[]>([]);


  useEffect(() => {
    const q = query(collection(db, selectedCollection), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as FormDataType),
      }));
      setMembers(docs);
    });
    return () => unsubscribe();
  }, [selectedCollection]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, selectedCollection), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData(initialFormData);
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Failed to add member.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, selectedCollection, id));
    } catch (err) {
      console.error("Error deleting document: ", err);
      alert("Failed to delete member.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>


        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="L1"
              checked={selectedCollection === "L1"}
              onChange={() => setSelectedCollection("L1")}
              className="mr-1"
            />
            L1
          </label>
          <label>
            <input
              type="radio"
              value="L2"
              checked={selectedCollection === "L2"}
              onChange={() => setSelectedCollection("L2")}
              className="mr-1"
            />
            L2
          </label>
        </div>


        <form onSubmit={handleSubmit} className="space-y-3">
          {(Object.keys(formData) as (keyof FormDataType)[]).map((field) => (
            <div key={field}>
              <label className="block capitalize mb-1">
                {field.replace("_", " ")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required={field !== "description"}
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Add Member
          </button>
        </form>
      </div>


      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Team Members - {selectedCollection}</h2>
        {members.length === 0 ? (
          <p>No members in this collection.</p>
        ) : (
          <div className="grid gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="border p-4 rounded shadow flex flex-col md:flex-row items-start gap-4"
              >
                <img
                  src={member.image_url || "https://via.placeholder.com/80"}
                  alt={member.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-sm">{member.description}</p>
                  <div className="flex gap-2 mt-2 text-sm text-blue-300">
                    {member.discord_url && (
                      <a href={member.discord_url} target="_blank" rel="noreferrer">
                        Discord
                      </a>
                    )}
                    {member.youtube_url && (
                      <a href={member.youtube_url} target="_blank" rel="noreferrer">
                        YouTube
                      </a>
                    )}
                    {member.instagram_url && (
                      <a href={member.instagram_url} target="_blank" rel="noreferrer">
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
