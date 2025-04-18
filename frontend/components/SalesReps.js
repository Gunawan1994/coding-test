import React, { useState, useEffect } from 'react';
import styles from '../styles/SalesReps.module.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const SalesRepsList = () => {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [regionFilter, setRegionFilter] = useState('All');

  useEffect(() => {
    const fetchSalesReps = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8000/api/data/data');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { salesReps } = await res.json();
        setSalesReps(salesReps);
      } catch (err) {
        console.error(err);
        setError('Filed to get data from server..');
      } finally {
        setLoading(false);
      }
    };
    fetchSalesReps();
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortOrder('asc'); }
  };

  const arrow = (key) => sortKey === key ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';

  const sorted = [...salesReps]
    .filter(r => regionFilter === 'All' || r.region === regionFilter)
    .sort((a, b) => {
      const aVal = a[sortKey] || '';
      const bVal = b[sortKey] || '';
      const comp = typeof aVal === 'string'
        ? aVal.localeCompare(bVal)
        : aVal - bVal;
      return sortOrder === 'asc' ? comp : -comp;
    });

  const regions = ['All', ...Array.from(new Set(salesReps.map(r => r.region)))];
  const chartData = salesReps.map(r => ({
    name: r.name,
    total: r.deals.reduce((sum, d) => sum + d.value, 0)
  }));

  if (loading) return <div className={styles.loadingScreen}>Loading…</div>;
  if (error) return <div className={styles.errorScreen}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Sales Representatives</h1>

      {/* Filter */}
      <div className={styles.controls}>
        <label>Filter by Region: </label>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
          {regions.map((reg,i) => <option key={i} value={reg}>{reg}</option>)}
        </select>
      </div>

      {/* Chart */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.sortable} onClick={() => handleSort('name')}>Name{arrow('name')}</th>
            <th className={styles.sortable} onClick={() => handleSort('role')}>Role{arrow('role')}</th>
            <th className={styles.sortable} onClick={() => handleSort('region')}>Region{arrow('region')}</th>
            <th>Skills</th>
            <th>Deals</th>
            <th>Clients</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(rep => (
            <tr key={rep.id}>
              <td>{rep.name}</td>
              <td>{rep.role}</td>
              <td>{rep.region}</td>
              <td>{rep.skills.join(', ')}</td>
              <td>
                {rep.deals.map((d,i) => (
                  <div key={i}>{d.client} (${d.value}) – <span className={styles[d.status.replace(/\s/g,'').toLowerCase()]}>{d.status}</span></div>
                ))}
              </td>
              <td>
                {rep.clients.map((c,i) => <div key={i}>{c.name} ({c.industry})</div>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRepsList;