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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Sales Representatives</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Region</th>
            <th>Skills</th>
            <th>Deals</th>
            <th>Clients</th>
          </tr>
        </thead>
        <tbody>
          {salesReps.map(rep => (
            <tr key={rep.id}>
              <td>{rep.name}</td>
              <td>{rep.role}</td>
              <td>{rep.region}</td>
              <td>{rep.skills.join(', ')}</td>
              <td>
                {rep.deals.map((deal, i) => (
                  <div key={i}>
                    {deal.client} (${deal.value}) –{' '}
                    <span className={styles[deal.status.replace(/\s/g, '').toLowerCase()]}>` 
                      {deal.status}
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {rep.clients.map((c, i) => (
                  <div key={i}>{c.name} ({c.industry})</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

if (loading) return <div className={styles.loadingScreen}>Loading…</div>;
if (error) return <div className={styles.errorScreen}>{error}</div>;

export default SalesRepsList;

