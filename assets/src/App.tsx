import Router from './router';

import { AuthContextProvider } from './store/authContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <div>
          <Router />
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
