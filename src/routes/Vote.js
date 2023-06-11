import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [votes, setVotes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const categories = {
    1: ['xyz', 'abc', '123'],
    2: ['option1', 'option2', 'option3']
  };

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
      [category]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ votes: votes })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('Failed to submit votes', error);
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
              {Object.keys(categories).map((category) => (
                <div key={category}>
                  <label>
                    Select for category {category}:
                    <select name={`category-${category}`} className="ml-2" onChange={(e) => handleChange(category, e)}>
                      {categories[category].map((option, index) => (
                        <option key={index} value={index + 1}>
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
