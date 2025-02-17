// import { useState } from "react";
import { useEffect, useState } from "react";
import { getDays } from "./utils";
import { BASE_URL } from "./url_sets";
// import './App.css'

interface Player {
  id: number;
  name: string;
}

function strDate(inputDate: Date) {
  const offset = inputDate.getTimezoneOffset();
  inputDate = new Date(inputDate.getTime() - offset * 60 * 1000);
  return inputDate.toISOString().split("T")[0];
}

function App() {
  // 2 mean tuesday
  const this_days = getDays(2025, 1, [0, 2]);
  const next_days = getDays(2025, 2, [0, 2]);
  const dates = [...this_days, ...next_days];
  const [selectedDate, setSelectedDate] = useState(strDate(dates[0]));
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectDate = (item: string) => {
    setSelectedDate(item);
    setIsLoading(true);
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      let response;
      if (selectedDate) {
        response = await fetch(`${BASE_URL}/players?matchDate=${selectedDate}`);
      } else {
        response = await fetch(`${BASE_URL}/products`);
      }

      const response_data = await response.json();
      const fetched_data = response_data.data as Player[];
      setPlayers(fetched_data);
      setIsLoading(false);
    };
    fetchPlayers();
  }, [selectedDate]);

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
      {dates.map((dateValue) => (
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              // handleSelectDate(date_value.toISOString().split("T")[0]);
              handleSelectDate(strDate(dateValue));
            }}
          >
            {`${
              dayNames[dateValue.getDay()]
            }, ${dateValue.toLocaleDateString()}`}
          </button>
          {
            <ul
              // className="list-group"
              className={
                (strDate(dateValue) === selectedDate) && (~isLoading)
                  ? "list-group"
                  : "list-group collapse"
              }
            >
              {players.map((item) => (
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
