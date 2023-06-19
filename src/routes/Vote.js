import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Vote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [votes, setVotes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

    const categories = {
    'ANIMASJON': {
      'link': 'https://f21.tv/animasjon-2023/',
      'Id': 1,
      'contestants': ['Elion - SoMe-video F21', 'Aksel - Profileringsgrafikk for F21', 'Daniel - Lab', 'Tyrese - F21-fjell', 'Joakim - Superman vs Batman', 'Julie - Animasjon']
    },
    'FILM: Fiksjonsfilm': {
      'link': 'https://f21.tv/fiksjonsfilm-2023/',
      'Id': 2,
      'contestants': ['Kristoffer m.fl - Trendpolitiet', 'Daniel m.fl - Den mystiske (magiske) hånden', 'Petra - Mobilen', 'Daniel - Zombie', 'Martin H. og Kristian G. - Culter']
    },
    'FILM: Musikkvideo': {
      'link': 'https://f21.tv/musikkvideo-2023/',
      'Id': 3,
      'contestants': ['Tor og Adrian - Ten Toes Down', 'Martin - Røkla-Ung kjærlighet', 'Herman, Edvard, Nikolas - Toppen av Oslo - Undergrunn', 'Thomas - Violet Hill - Coldplay', 'Amalie, Pia, Mina, Maria - Was it true']
    },
    'FILM: Reklamefilm': {
      'link': 'https://f21.tv/reklamefilm-2023/',
      'Id': 4,
      'contestants': ['Alf Viktor - Beats', 'Destiny - Allkrydda', 'Nikolas - 1984 - Boktrailer', 'Vilde og Celina - Grandiosa – Half n´half']
    },
    'Foto: Portrettfoto': {
      'link': 'https://f21.tv/portrettfoto-2023/',
      'Id': 5,
      'contestants': ['Apiraa - Klær og kultur', 'Siana-Eftihia - Valeriia', 'Kim - Sivert', 'Charlotte - Mathea']
    },
    'Foto: Dokumentarfoto': {
      'link': 'https://f21.tv/dokumentarfoto-2023/',
      'Id': 6,
      'contestants': ['Siana-Eftihia - Mottaksklassen', 'Emma - Hus-Stovner – Blokk-Stovner', 'Lorin - Familie', 'Tarjej - Konsert og revy']
    },
    'Foto: Kunstfoto': {
      'link': 'https://f21.tv/kunstfoto-2023/',
      'Id': 7,
      'contestants': ['Julia - Andres blikk', 'Karolina - Personal Boundaries', 'Rue Ahmed - Tell me about yourself']
    },
    'GRAFISK DESIGN: Reklamedesign og informasjonsdesign': {
      'link': 'https://f21.tv/reklamedesign-og-informasjonsdesign-2023/',
      'Id': 8,
      'contestants': ['Thea - Stop, tenk, resirkuler', 'Elsa marie - «Ta vare på deg selv i hverdagen»', 'Marius - Fuck the norms', 'Shuvasa - Pulp Fiction', 'Kamil - 2 minutter', 'Celina - “Er det så vanskelig?»']
    },
    'GRAFISK DESIGN: Illustrasjon og magasin': {
      'link': 'https://f21.tv/illustrasjon-og-magasindesign-2023/',
      'Id': 9,
      'contestants': ['Julie - Uten tittel', 'edvard - Obey', 'elsa- marie - Paul is dead', 'Celine Isabel - Yesterday I was the moon']
    },
    'GRAFISK DESIGN: Visuell identitet': {
      'link': 'https://f21.tv/visuell-identitet-2023/',
      'Id': 10,
      'contestants': ['Bendik - Topaz', 'Marius - Melo', 'Elisa - Ploom', 'Iben - Solkollen garn']
    },
    'INTERAKTIV HISTORIEFORTELLING': {
      'link': 'https://f21.tv/interaktiv-historiefortelling-2023/',
      'Id': 11,
      'contestants': ['Sandra - Den Skjulte Makten', 'Sebastian - Hei Kjære', 'Max - The Cyclops', 'Lucas - Prison Break']
    },
    'JOURNALISTIKK': {
      'link': 'https://f21.tv/journalistikk-2023/',
      'Id': 12,
      'contestants': ['Destiny - Kjærlighet', 'Martin - Hva er bandskolen?', 'Alisha - Story of my life', 'Jostein m.fl. - McMartii', 'Vasco - Vasco på Stortinget']
    },
    'LYDDESIGN: Musikkproduksjon': {
      'link': 'https://f21.tv/musikkproduksjon-2023/',
      'Id': 13,
      'contestants': ['Altea - Your Birthday', 'Laurits - Uten tittel', 'Lavrans - Orkestermusikk 1', 'Magnar, Victor, Mathias og Billy - Pistoler kan ikke be til Allah']
    },
    'LYDDESIGN: Radiospot': {
      'link': 'https://f21.tv/radiospot-2023/',
      'Id': 14,
      'contestants': ['Destiny - Bose', 'Julieta Victoria - Norwegian anbefaler Bose', 'Pia Olea - Noise Canceling Bose']
    },
    'SPILL OG 3D-DESIGN': {
      'link': 'https://f21.tv/spill-og-3d-design-2023/',
      'Id': 15,
      'contestants': ['Henrik - Pixel Outlaw', 'Abu - Geo Dash', 'Sebastian - Into The Dark', 'Aksel - Mechropolis', 'Lavrans - F21-logo i 3D', 'Hüseyin - F21-invaders']
    },
    'TEGNESERIE': {
      'link': 'https://f21.tv/tegneserie-2023/',
      'Id': 16,
      'contestants': ['Vilde - Konspirasjonsteorier', 'Amalie - Konspirasjonsteorier', 'Mina - Konspirasjonsteorier', 'Kai - Ephemeral Art Love']
    }
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isAdminPreview = params.get('preview') === 'admin';
    
    if (isAdminPreview) {
      setAuthenticated(true);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
      } else {
        navigate('/');
      }
    }
  }, [navigate, location]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const formattedVotes = Array.from({ length: 16 }, (_, i) => votes[i + 1] || 0);
      const votesObject = formattedVotes.reduce((obj, vote, index) => {
        obj[index + 1] = vote;
        return obj;
      }, {});
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ votes: votesObject }),
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

  const handleVote = () => {
    const [category, index] = selectedOption.split('-');
    setVotes((prevVotes) => ({
      ...prevVotes,
      [category]: parseInt(index) + 1,
    }));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 overflow-y-auto max-h-screen svh">
      {authenticated ? (
        <>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Gi din stemme til publikums favoritt</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : success !== null ? (
            success ? (
              <p className="text-green-500">Stemmen din har blitt sendt!</p>
            ) : (
              <p className="text-red-500">Noe gikk feil. Vennligst prøv igjen.</p>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(categories).map((category) => (
                <div key={category}>
                  <a href={categories[category].link} target="_blank" rel="noopener noreferrer">
                    <p className="font-bold">{category}</p>
                  </a>
                  {categories[category].contestants.map((option, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name={category}
                        value={`${categories[category].Id}-${index}`}
                        onChange={handleChange}
                        checked={selectedOption === `${categories[category].Id}-${index}`}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              ))}
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded"
                onClick={handleVote}
                disabled={!selectedOption}
              >
                Send inn stemme
              </button>
            </form>
          )}
        </>
      ) : (
        <p>Laster...</p>
      )}
    </div>
  );
};

export default Vote;