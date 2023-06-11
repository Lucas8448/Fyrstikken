import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [votes, setVotes] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const categories = useMemo(() => {
    return {
      1: ['--Ingen valgt--', 'abc', '123'],
      2: ['--Ingen valgt--', 'abc', '123'],
      3: ['--Ingen valgt--', 'abc', '123'],
      4: ['--Ingen valgt--', 'abc', '123'],
      5: ['--Ingen valgt--', 'abc', '123'],
      6: ['--Ingen valgt--', 'abc', '123'],
      7: ['--Ingen valgt--', 'abc', '123'],
      8: ['--Ingen valgt--', 'abc', '123'],
      9: ['--Ingen valgt--', 'abc', '123'],
      10: ['--Ingen valgt--', 'abc', '123'],
      11: ['--Ingen valgt--', 'abc', '123'],
      12: ['--Ingen valgt--', 'abc', '123'],
      13: ['--Ingen valgt--', 'abc', '123'],
      14: ['--Ingen valgt--', 'abc', '123'],
    };
  }, []);

  useEffect(() => {
    const initialVotes = {};
    for (let category in categories) {
      initialVotes[category] = 0;
    }
    setVotes(initialVotes);
  }, [categories]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (category, event) => {
    setVotes({
      ...votes,
      [category]: parseInt(event.target.value, 10)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ votes: votes })
      });

      if (!response.ok) {
        throw new Error('Failed to submit votes');
      }

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('Failed to submit votes', error);
      setError(error.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {authenticated ? (
        <>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to the voting page</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : success !== null ? (
            success ? (
              <p className="text-green-500">Your votes have been successfully submitted!</p>
            ) : (
              <p className="text-red-500">Failed to submit votes. Please try again.</p>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
              {Object.keys(categories).map((category) => (
                <div key={category}>
                  <label>
                    Select for category {category}:
                    <select name={`category-${category}`} className="ml-2" onChange={(e) => handleChange(category, e)}>
                      {categories[category].map((option, index) => (
                        <option key={index} value={index}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">
                Submit Vote
              </button>
            </form>
            
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Vote;
