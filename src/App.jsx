
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Home");
  const [message, setMessage] = useState("");

  const [flight, setFlight] = useState({
    name: "",
    from: "",
    to: "",
    date: "",
    passengers: "1",
  });

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    checkin: "",
    checkout: "",
    rooms: "1",
  });

  const [cab, setCab] = useState({
    name: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
  });

  function updateFlight(e) {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  }

  function updateHotel(e) {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  }

  function updateCab(e) {
    setCab({ ...cab, [e.target.name]: e.target.value });
  }

  function goTo(nextPage) {
    setPage(nextPage);
    setMessage("");
  }

  function bookFlight(e) {
    e.preventDefault();
    setMessage(
      `Flight request received for ${flight.name}. ${flight.from} to ${flight.to}.`
    );
  }

  function bookHotel(e) {
    e.preventDefault();
    setMessage(
      `Hotel request received for ${hotel.name} in ${hotel.city}.`
    );
  }

  function bookCab(e) {
    e.preventDefault();
    setMessage(
      `Cab request received for ${cab.name}: ${cab.pickup} to ${cab.destination}.`
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <button className="logo" onClick={() => goTo("Home")}>
          <span>✈</span> TravelEase
        </button>

        <nav>
          {["Home", "Flights", "Hotels", "Cabs"].map((item) => (
            <button
              key={item}
              className={page === item ? "nav-link active" : "nav-link"}
              onClick={() => goTo(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {page === "Home" && (
        <main className="hero">
          <div className="hero-content">
            <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
            <h1>
              Explore the World,
              <br />
              <span>Your Way.</span>
            </h1>
            <p className="hero-description">
              Discover amazing destinations, find comfortable stays,
              and plan your next adventure in one place.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => goTo("Flights")}>
                Book a Flight →
              </button>
              <button className="secondary-btn" onClick={() => goTo("Hotels")}>
                Find Hotels
              </button>
            </div>

            <div className="features">
              <div>
                <strong>✈ Flights</strong>
                <span>Plan your journey</span>
              </div>
              <div>
                <strong>⌂ Hotels</strong>
                <span>Find your stay</span>
              </div>
              <div>
                <strong>🚕 Cabs</strong>
                <span>Travel with ease</span>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === "Flights" && (
        <main className="booking-area">
          <section className="booking-card">
            <p className="eyebrow">FLY TO YOUR NEXT ADVENTURE</p>
            <h1>Book Your Flight</h1>
            <p className="subtitle">Enter your passenger and journey details.</p>

            <form onSubmit={bookFlight}>
              <label>Passenger Full Name</label>
              <input
                name="name"
                value={flight.name}
                onChange={updateFlight}
                placeholder="Enter your full name"
                required
              />

              <div className="form-grid">
                <div>
                  <label>From</label>
                  <input
                    name="from"
                    value={flight.from}
                    onChange={updateFlight}
                    placeholder="Departure city"
                    required
                  />
                </div>
                <div>
                  <label>To</label>
                  <input
                    name="to"
                    value={flight.to}
                    onChange={updateFlight}
                    placeholder="Destination city"
                    required
                  />
                </div>
                <div>
                  <label>Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={flight.date}
                    onChange={updateFlight}
                    required
                  />
                </div>
                <div>
                  <label>Passengers</label>
                  <select
                    name="passengers"
                    value={flight.passengers}
                    onChange={updateFlight}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="primary-btn full-btn" type="submit">
                Submit Flight Request
              </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            <p className="notice">
              Demo only: this form does not search real flights or issue tickets.
            </p>
          </section>
        </main>
      )}

      {page === "Hotels" && (
        <main className="booking-area">
          <section className="booking-card">
            <p className="eyebrow">FIND YOUR PERFECT STAY</p>
            <h1>Book Your Hotel</h1>
            <p className="subtitle">Enter your guest and accommodation details.</p>

            <form onSubmit={bookHotel}>
              <label>Guest Full Name</label>
              <input
                name="name"
                value={hotel.name}
                onChange={updateHotel}
                placeholder="Enter guest full name"
                required
              />

              <label>City or Destination</label>
              <input
                name="city"
                value={hotel.city}
                onChange={updateHotel}
                placeholder="Where do you want to stay?"
                required
              />

              <div className="form-grid">
                <div>
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    name="checkin"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={hotel.checkin}
                    onChange={updateHotel}
                    required
                  />
                </div>
                <div>
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    name="checkout"
                    min={hotel.checkin || new Date().toLocaleDateString("en-CA")}
                    value={hotel.checkout}
                    onChange={updateHotel}
                    required
                  />
                </div>
              </div>

              <label>Number of Rooms</label>
              <select
                name="rooms"
                value={hotel.rooms}
                onChange={updateHotel}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <button className="primary-btn full-btn" type="submit">
                Submit Hotel Request
              </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            <p className="notice">
              Demo only: this form does not check hotel availability or confirm a reservation.
            </p>
          </section>
        </main>
      )}

      {page === "Cabs" && (
        <main className="booking-area">
          <section className="booking-card">
            <p className="eyebrow">YOUR RIDE, YOUR WAY</p>
            <h1>Book Your Cab</h1>
            <p className="subtitle">Enter your details to request a ride.</p>

            <form onSubmit={bookCab}>
              <label>Passenger Full Name</label>
              <input
                name="name"
                value={cab.name}
                onChange={updateCab}
                placeholder="Enter your full name"
                required
              />

              <label>Pickup Location</label>
              <input
                name="pickup"
                value={cab.pickup}
                onChange={updateCab}
                placeholder="Enter pickup location"
                required
              />

              <label>Destination</label>
              <input
                name="destination"
                value={cab.destination}
                onChange={updateCab}
                placeholder="Enter destination"
                required
              />

              <div className="form-grid">
                <div>
                  <label>Pickup Date</label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={cab.date}
                    onChange={updateCab}
                    required
                  />
                </div>
                <div>
                  <label>Pickup Time</label>
                  <input
                    type="time"
                    name="time"
                    value={cab.time}
                    onChange={updateCab}
                    required
                  />
                </div>
              </div>

              <button className="primary-btn full-btn" type="submit">
                Submit Cab Request
              </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            <p className="notice">
              Demo only: this form does not contact a cab driver or confirm a ride.
            </p>
          </section>
        </main>
      )}

      <footer>
        <p>© 2026 TravelEase | Explore. Discover. Travel.</p>
      </footer>
    </div>
  );
}

export default App;
