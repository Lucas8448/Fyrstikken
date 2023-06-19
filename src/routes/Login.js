import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', data.token);
        navigate('/vote');
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col justify-between py-4 sm:py-12 px-4 sm:px-6 lg:px-8 bg-black svh">
      <video autoPlay loop muted className="absolute w-full h-full object-cover" style={{ zIndex: -1 }}>
        <source src="your-video-source.mp4" type="video/mp4" />
      </video>
      <header className="text-center text-white py-2 sm:py-4 mb-4 sm:mb-8 w-full">
        <h1 className="font-bold text-2xl sm:text-4xl">Fyrstikken</h1>
      </header>
      <div className="flex flex-col justify-center max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold text-272727">
            Oppgi utdelt brukernavn og passord
          </h2>
        </div>
        <form className="mt-4 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username-address" className="sr-only">Brukernavn</label>
              <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-8497f6 focus:border-8497f6 focus:z-10 sm:text-sm" placeholder="Brukernavn" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Passord</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-8497f6 focus:border-8497f6 focus:z-10 sm:text-sm" placeholder="Passord" />
            </div>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Logg inn
            </button>
          </div>
        </form>
      </div>
      <footer className="text-center text-white py-2 sm:py-4 w-full">
        <p className="font-bold text-lg sm:text-xl">Fyrstikkalleen Skole (F21)</p>
        <p>Laget av Lucas, 1IMA</p>
      </footer>
    </div>
  );
};

export default LoginPage;