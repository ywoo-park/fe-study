import './App.css';
import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


import Roles from './components/roles'
import Teams from './components/teams'
import People from './components/people'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {

  const [menu, setMenu] = useState('Roles')

  let mainComp = {
    Roles: (<Roles />),
    Teams: (<Teams />),
    People: (<People />),
  }

  function NavMenus() {
    return [
      'Roles', 'Teams', 'People'
    ].map((_menu, key) => {
      return (
        <li key={key} className={menu === _menu ? 'on' : ''}
          onClick={() => { setMenu(_menu); }}>{_menu}</li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>
              {NavMenus()}
            </ul>
          </nav>
        </header>
        <main>
          {mainComp[menu]}
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
