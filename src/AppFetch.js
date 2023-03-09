//esta parte de la app utilizamos fetch para hacer el consumo de la API
import './App.css';
import { useFetch } from './useFetch';

function AppFetch() {
  const {data, loading, error, handleCancelRequest} = useFetch(
    "https://jsonplaceholder.typicode.com/users"
    );

  return (
    <div className="App">
      <h1>Fetch like a pro</h1>
      <button onClick={handleCancelRequest}>Cancel Request</button>
      <div>
        <ul>
          {error && <li>Error: {error}</li>}
          {loading && <li>Loading...</li>}
          {data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AppFetch;
