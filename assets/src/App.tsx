import {useState} from 'react';

function Authenticate() {
  const [user, setUser] = useState({ Username: '', Password: '' });
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const [netWorkError, setNetworkError] = useState('');

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const createUser = async (data: any) => {
    const res = await fetch('http://localhost:8080/api/v1/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    createUser(user)
      .then((res) => {
        if ('err' in res) {
          setServerError(res.err);
        }
        console.log('response', res);
        setSuccess(res.msg);
      })
      .catch(err => {
        setNetworkError(err);
        console.log('catching errors');
      });
  };

  if(serverError || netWorkError) {
    return (
      serverError ? (
        <p>Server error: {serverError}</p>
      ) : (
        <p>Network error: {netWorkError}</p>
      )
    )
  } 
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="Username" value={user.Username} onChange={handleChange} />
          <input type="password" name="Password" value={user.Password} onChange={handleChange} />
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      ) : (
        <p>{success}</p>
      )}
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
