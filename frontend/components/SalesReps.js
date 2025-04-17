import React, { useState, useEffect } from 'react';

const SalesRepsList = () => {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesReps = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8000/api/data/data');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { salesReps } = await res.json();
        setSalesReps(salesReps);
      } catch (err) {
        setError('Filed to get data from server..');
      } finally {
        setLoading(false);
      }
    };
    fetchSalesReps();
  });
}

export default SalesRepsList;

