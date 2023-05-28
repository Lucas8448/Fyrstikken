import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    navigate('/vote');
  };

  return (
    <div className="flex flex-col justify-between min-h-screen py-4 sm:py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <video autoPlay loop muted className="absolute w-full h-full object-cover" style={{ zIndex: -1 }}>
        <source src="your-video-source.mp4" type="video/mp4" />
      </video>
      <header className="text-center text-white py-2 sm:py-4 mb-4 sm:mb-8 w-full">
        <h1 className="font-bold text-2xl sm:text-4xl">Fyrstikken</h1>
      </header>
      <div className="flex flex-col justify-center max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold text-272727">
            Logg inn i din skole konto
          </h2>
        </div>
        <form className="mt-4 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">E-postadresse</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-8497f6 focus:border-8497f6 focus:z-10 sm:text-sm" placeholder="E-postadresse" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Passord</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-8497f6 focus:border-8497f6 focus:z-10 sm:text-sm" placeholder="Passord" />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Logg inn
            </button>
          </div>
        </form>
      </div>
      <footer className="text-center text-white py-2 sm:py-4 w-full">
        <p className="font-bold text-lg sm:text-xl">Fyrstikkalleen Skole (F21)</p>
        <p>Følg oss på Instagram</p>
      </footer>
    </div>
  );
};

export default LoginPage;
