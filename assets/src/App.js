import {useState, useEffect} from 'react';

function Authenticate() {
  const [user, setUser] = useState({ Username: '', Password: '' });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

    createUser(user);
    console.log('Submitting...', user);
  };

  const createUser = async (data) => {
    const res = await fetch('http://localhost:8080/api/v1/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Username" value={user.Username} onChange={handleChange} />
        <input type="password" name="Password" value={user.Password} onChange={handleChange} />

        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </>
  )
};

function App() {
  return (
    <div className="App">
      <div>
        <Authenticate />
      </div>
    </div>
  );
}

export default App;
