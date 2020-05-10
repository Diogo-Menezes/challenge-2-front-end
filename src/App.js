import React, { useEffect, useState } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  function loadRepositories() {
    api
      .get('repositories')
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Error loading repository list');
      });
  }

  useEffect(loadRepositories, []);

  async function handleAddRepository() {
    const repo = {
      url: 'https://github.com/josepholiveira',
      title: `${Date.now()}`,
      techs: ['React', 'Node.js'],
    };
    try {
      const response = await api.post('repositories', repo);
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      if (response.status === 204) {
        
        setRepositories(repositories.filter((repo) => repo.id !== id));
      }
    } catch (error) {
      alert('Something went wrong, please try again');
      console.warn(error);
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
