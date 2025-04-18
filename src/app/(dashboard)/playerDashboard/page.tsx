'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase/supabaseClient';

function PlayerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user is logged in.</div>;
  }

  return (
    <div>
      <h1>Welcome to the Player Dashboard</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.id}</p>
      <p><strong>Metadata:</strong> {JSON.stringify(user.user_metadata)}</p>
    </div>
  );
}

export default PlayerDashboard;