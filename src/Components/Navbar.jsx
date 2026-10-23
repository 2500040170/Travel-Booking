
const handleBooking = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/bookings", {
      passengerName,
      bookingType: "flight",
      from,
      to,
      travelDate: date
    });

    alert(response.data.message);
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message ||
      "Booking failed. Check the backend connection."
    );
  }
};
