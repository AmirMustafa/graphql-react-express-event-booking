import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  Fragment,
} from "react";
import AuthContext from "../context/auth-context";
import Modal from "../components/Navigation/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import EventList from "../components/Events/EventList/EventList";
import Spinner from "../components/Spinner/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Events.css";

import { createEvent, fetchEvents } from "../store/event-store";
import { bookEvent } from "../store/booking-store";

const Events = () => {
  const authContext = useContext(AuthContext);
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    setIsLoading(true);
    const data = await fetchEvents(authContext.token);
    setEvents(data.events);
    setIsLoading(false);
  };

  const validateData = (title, price, description, date) => {
    if (
      title.trim().length === 0 ||
      price.trim().length === 0 ||
      description.trim().length === 0 ||
      date.trim().length === 0
    ) {
      toast.error(
        "Fields Title, Price, Date, and Description cannot be empty!",
        {
          position: "top-right",
        }
      );

      return {
        res: false,
        errmsg: "Fields Title, Price, Date, and Description cannot be empty!",
      };
    }
    return { res: true, errmsg: null };
  };

  const startCreateHandler = () => {
    setCreating(true);
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };
  const modalConfirmHandler = async () => {
    setCreating(false);
    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const date = dateRef.current.value;

    const event = { title, price: +price, description, date };

    // Clear form fields
    titleRef.current.value = "";
    priceRef.current.value = "";
    dateRef.current.value = "";
    descriptionRef.current.value = "";

    const isValid = validateData(title, price, description, date);
    if (!isValid.res) {
      return;
    }

    // Calling GraphQL API
    const newEvent = await createEvent(event, authContext.token);
    if (newEvent && newEvent.hasOwnProperty("data")) {
      toast.success(
        `${newEvent.data.createEvent.title} event created successfully!`,
        {
          position: "top-right",
        }
      );
      getEvents();
    } else {
      toast.error(`Error creating event!`, {
        position: "top-right",
      });
    }
  };

  const showDetailHandler = (eventId) => {
    const selectedEvents = events.find((e) => e._id === eventId);
    setSelectedEvent(selectedEvents);
    return { selectedEvents };
  };

  const bookEventHandler = async (eventId) => {
    // Calling GraphQL API
    const bookedEvent = await bookEvent(eventId, authContext.token);
    if (bookedEvent && bookedEvent.hasOwnProperty("data")) {
      toast.success(
        `${bookedEvent?.data?.bookEvent?.event?.title} event booked successfully!`,
        {
          position: "top-right",
        }
      );
      setSelectedEvent(null);
    }
  };

  return (
    <Fragment>
      {(creating || selectedEvent) && <Backdrop />}
      {creating && (
        <Modal
          title="Create Modal"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText={"Confirm"}
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleRef} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                ref={descriptionRef}
              ></textarea>
            </div>
          </form>
        </Modal>
      )}

      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={() => bookEventHandler(selectedEvent._id)}
          confirmText={"Book"}
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{" "}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}

      {authContext?.userId && (
        <div className="events-control">
          <p>Create your own event!</p>
          <button className="btn" onClick={startCreateHandler}>
            Create Event
          </button>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={authContext.userId}
          onViewDetail={showDetailHandler}
        />
      )}

      <ToastContainer />
    </Fragment>
  );
};
export default Events;
