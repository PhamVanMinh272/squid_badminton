// import { useState } from "react";
import { useEffect, useState } from "react";
import { toDate } from "./utils";
import { BASE_URL } from "./url_sets";
// import './App.css'

interface Player {
  id: number;
  name: string;
}

interface Match {
  id: number;
  matchDate: string;
  court: string;
  players: Player[];
}

function App() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      let response;
      response = await fetch(`${BASE_URL}/matches`);
      const response_data = await response.json();
      const fetched_data = response_data.data as Match[];
      setMatches(fetched_data);
    };
    fetchMatches();
  }, []);

  const dayNames = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  return (
    <div className="container">
      <h3>Check xem hum nay có những ai nò</h3>
      <p className={matches.length > 0 ? "collapse" : "visible"}>Loading ...</p>
      {matches.map((match) => (
        <div>
          <hr></hr>
          <button type="button" className="btn btn-success">
            {`${dayNames[toDate(match.matchDate).getDay()]}, ${toDate(
              match.matchDate
            ).toLocaleDateString()}, ${match.court}`}
          </button>
          {
            <ul className="list-group">
              {match.players.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.name}
                </li>
              ))}
            </ul>
          }
        </div>
      ))}
    </div>
  );
}

export default App;
