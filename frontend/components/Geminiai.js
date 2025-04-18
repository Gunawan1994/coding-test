import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Geminiai.module.css';

const Geminiai = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const historyEndRef = useRef(null);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const answer = data.answer;
      setHistory(prev => [...prev, { question, answer }]);
      setQuestion('');
    } catch (err) {
      console.error(err);
      setError('Gagal mendapatkan respons AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Tanya Geminiai AI</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Tulis pertanyaan Anda..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={styles.input}
          disabled={loading}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Memproses...' : 'Kirim'}
        </button>
      </form>

      <div className={styles.history}>
        {history.map((msg, idx) => (
          <div key={idx} className={styles.messagePair}>
            <div className={styles.userMessage}><strong>You:</strong> {msg.question}</div>
            <div className={styles.aiMessage}><strong>AI:</strong> {msg.answer}</div>
          </div>
        ))}
        <div ref={historyEndRef} />
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Geminiai;