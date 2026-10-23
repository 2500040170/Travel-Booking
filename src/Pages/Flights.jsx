 
import { useState } from "react";
import api from "../api";
import "./Flights.css";

function Flights() {
  const [passengerName, setPassengerName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passengerName.trim() || !from.trim() || !to.trim() || !date) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setMessage("From and To cities must be different.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/bookings", {
        passengerName: passengerName.trim(),
        bookingType: "flight",
        from: from.trim(),
        to: to.trim(),
        travelDate: date,
        passengers: Number(passengers),
      });

      setMessage(
        response.data.message || "Flight booking saved successfully!"
      );

      setPassengerName("");
      setFrom("");
      setTo("");
      setDate("");
      setPassengers("1");
    } catch (error) {
      console.error("Flight booking error:", error);

      setMessage(
        error.response?.data?.message ||
          "Booking failed. Please check your backend and MongoDB connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-page">
      <div className="flight-card">
        <p className="flight-tagline">
          FLY TO YOUR NEXT ADVENTURE
        </p>

        <h1>Book Your Flight</h1>

        <p className="flight-description">
          Enter your passenger and journey details.
        </p>

        <form onSubmit={handleBooking}>
          <div className="flight-form-group">
            <label htmlFor="passengerName">
              Passenger Full Name
            </label>
            <input
              id="passengerName"
              type="text"
              placeholder="Enter passenger full name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
          </div>

          <div className="flight-form-row">
            <div className="flight-form-group">
              <label htmlFor="from">From</label>
              <input
                id="from"
                type="text"
                placeholder="Departure city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>

            <div className="flight-form-group">
              <label htmlFor="to">To</label>
              <input
                id="to"
                type="text"
                placeholder="Destination city"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flight-form-row">
            <div className="flight-form-group">
              <label htmlFor="date">Travel Date</label>
              <input
                id="date"
                type="date"
                value={date}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="flight-form-group">
              <label htmlFor="passengers">Passengers</label>
              <select
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="flight-book-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving Booking..." : "Submit Flight Request"}
          </button>
        </form>

        {message && (
          <p className="flight-message" role="status">
            {message}
          </p>
        )}

        <p className="flight-footer">
          Demo only: this form saves a booking request; it does not
          issue airline tickets.
        </p>
      </div>
    </div>
  );
}

export default Flights;
