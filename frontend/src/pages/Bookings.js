import React, { useState, useEffect, useContext, Fragment } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components/Bookings/BookingList/BookingList";
import { toast, ToastContainer } from "react-toastify";
import { fetchBookings, cancelBooking } from "../store/booking-store";

const Bookings = () => {
  const authContext = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    setIsLoading(true);
    const data = await fetchBookings(authContext.token);
    setBookings(data.bookings);
    setIsLoading(false);
  };

  const deleteBookingHandler = async (bookingId) => {
    setIsLoading(true);

    // Cancel Booking GraphQL API
    const data = await cancelBooking(bookingId, authContext.token);
    if (data) {
      // Fetch Booking GraphQL API
      getBookings();
      setIsLoading(false);
      toast.success(`Booking cancelled successfully!`, {
        position: "top-right",
      });
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <BookingList bookings={bookings} onDelete={deleteBookingHandler} />
      )}
      <ToastContainer />
    </Fragment>
  );
};
export default Bookings;
