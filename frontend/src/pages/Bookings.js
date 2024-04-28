import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";
import { fetchBookings } from "../store/booking-store";

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

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {bookings?.map((booking) => (
            <li key={booking._id}>
              {booking?.event.title} -
              {new Date(booking?.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Bookings;
