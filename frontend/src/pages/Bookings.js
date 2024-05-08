import React, { useState, useEffect, useContext, Fragment } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components/Bookings/BookingList/BookingList";
import BookingsChart from "../components/Bookings/BookingsChart/BookingsChart";
import { toast, ToastContainer } from "react-toastify";
import { fetchBookings, cancelBooking } from "../store/booking-store";

const Bookings = () => {
  const authContext = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [outputType, setOutputType] = useState("list");

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
      toast.success(
        `${data.cancelBooking.title} booking cancelled successfully!`,
        {
          position: "top-right",
        }
      );
    }
    setIsLoading(false);
  };

  const changeOutputHandler = (type) => {
    if (type === "list") {
      setOutputType("list");
    } else {
      setOutputType("chart");
    }
  };

  let content = <Spinner />;

  if (!isLoading) {
    content = (
      <Fragment>
        <div>
          <button onClick={() => changeOutputHandler("list")}>List</button>
          <button onClick={() => changeOutputHandler("chart")}>Charts</button>
        </div>
        <div>
          {outputType === "list" ? (
            <BookingList bookings={bookings} onDelete={deleteBookingHandler} />
          ) : (
            <BookingsChart bookings={bookings} />
          )}
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {content}
      <ToastContainer />
    </Fragment>
  );
};
export default Bookings;
