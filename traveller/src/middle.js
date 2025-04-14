import { useEffect, useState } from "react";
import ind from "./aasets/images/ind.jpg";
import { FaEdit, FaPlus } from "react-icons/fa";

function Middle() {
  const [trips, setTrips] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingTripId, seteditingTripId] = useState(null);

  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");
      const tripData = "https://nakama-set-sail.onrender.com/api/trips";
      const res = await fetch(tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTrips(data);
    } catch (error) {
      console.log("error while getting data", error);
    }
  };

  const deletetrip = async (id) => {
    if (!id || id.length !== 24) {
      console.error("Invalid ID format:", id);
      return;
    }

    try {
      const url = `https://nakama-set-sail.onrender.com/api/trips/${id}`;

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setTrips(trips.filter((trip) => trip._id !== id));
      } else {
        console.log("cannot delete the trip");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", submitForm.title);
      formData.append("description", submitForm.description);
      formData.append("location", submitForm.location);
      formData.append("date", submitForm.date);
      if (submitForm.image) {
        formData.append("image", submitForm.image);
      }

      const url = isEditing
        ? `https://nakama-set-sail.onrender.com/api/trips/${editingTripId}`
        : "https://nakama-set-sail.onrender.com/api/trips";

      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (isEditing) {
        setTrips(
          trips.map((trip) => (trip._id === editingTripId ? data : trip))
        );
      } else {
        setTrips([data, ...trips]);
      }

      setShowPopup(false);
      setSubmitForm({
        title: "",
        description: "",
        date: "",
        location: "",
      });
      setIsEditing(false);
      seteditingTripId(null);
    } catch (error) {
      console.log("error while submitting form", error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <div id="tripsy" className="past-journey">
      <div className="trip-add">
        <h2>Past Journey's</h2>
        <div>
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("You must be logged in to add or edit trips.");
                return;
              }
              setIsEditing(false);
              setShowPopup(true);
              setSubmitForm({
                title: "",
                description: "",
                location: "",
                date: "",
              });
            }}
            className="add-journey"
          >
            <FaPlus />
            <span className="btn-text">journeys</span>
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup-form">
          <form onSubmit={handleSubmit} className="trip-form">
            <h3>{isEditing ? "Edit trip" : "Create New Trip"}</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSubmitForm({ ...submitForm, image: e.target.files[0] })
              }
            />
            <input
              type="text"
              placeholder="Title"
              value={submitForm.title}
              onChange={(e) =>
                setSubmitForm({ ...submitForm, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={submitForm.location}
              onChange={(e) =>
                setSubmitForm({ ...submitForm, location: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              value={submitForm.description}
              onChange={(e) =>
                setSubmitForm({ ...submitForm, description: e.target.value })
              }
              required
            />
            <input
              type="date"
              id="dateInput"
              value={submitForm.date}
              onChange={(e) =>
                setSubmitForm({ ...submitForm, date: e.target.value })
              }
            
            />
            <div className="btn-trip">
              <button type="submit">{isEditing ? "Edit" : "Create"}</button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="middle-row">
        {trips.length === 0
          ? "Please add trips"
          : trips.map((trip, index) => (
              <div key={trip._id} className={`con-${index + 1} middle`}>
                <img
                  src={
                    trip.imageUrl
                      ? `${trip.imageUrl}`
                      : ind
                  }
                  alt={trip.title}
                />

                <h3>{trip.title}</h3>
                <p>{trip.location}</p>
                <p style={{ fontSize: 16 }}>
                  {new Date(trip.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <p style={{ fontSize: 16 }}>{trip.description}</p>
                <div className="edit-btn">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowPopup(true);
                      setSubmitForm({
                        title: trip.title,
                        description: trip.description,
                        location: trip.location,
                        date: trip.date,
                      });
                      seteditingTripId(trip._id);
                    }}
                    className="add-journey"
                  >
                    <FaEdit className="edit-icon" />
                    <span className="btn-text">Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this trip?"
                      );
                      if (confirmDelete) {
                        deletetrip(trip._id);
                      }
                    }}
                    className="add-journey"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Middle;
