import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import ShowtimeDetails from "../components/ShowtimeDetails";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";
import { set } from "mongoose";

const Tickets = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState(null)
  const [rewardPoints, setRewardPoints] = useState(0);
  const [isFetchingticketsDone, setIsFetchingticketsDone] = useState(false);
  const [membership, setMembership] = useState("");
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const fetchTickets = async () => {
    try {
      setIsFetchingticketsDone(false);
      const response = await axios.get("/auth/tickets", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTickets(
        response.data.data.tickets?.sort((a, b) => {
          if (a.showtime.showtime > b.showtime.showtime) {
            return 1;
          }
          return -1;
        })
      );
      setRewardPoints(response.data.data.rewardPoints);
      setMembership(response.data.data.membership);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingticketsDone(true);
    }
  };

  const handleCancelTicket = async (ticketId) => {
    if (!ticketId) {
      console.error('Ticket _id is undefined');
      return;
    }

    try {
      const response = await axios.delete(`/showtime/cancel/${ticketId}`, {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
      if (response.data.success) {
        // alert("Success!!");
        //setShowSuccessMessage(true);
        console.log('hereee');
        setShowModal(true); 
        setTickets(currentTickets => currentTickets.filter(t => t._id !== ticketId));
      } else {
        console.error('Failed to cancel the ticket:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while cancelling the ticket:', error);
    }
  };

  // const fetchMoviesWatched = async (showtimeIds) => {
  //   try {
  //     // Step 1: Send Tickets Data to Backend
  //     const response = await axios.post(
  //       "/movie/fetchMoviesWatched",
  //       { showtimeIds },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.token}`,
  //         },
  //       }
  //     );
  
  //     // Step 2: Receive Movies Data from Backend
  //     const moviesWatched  = response.data.data;
  
  //     // Step 3: Update State to Display Movies
  //     setMoviesWatched(moviesWatched);
  //   } catch (error) {
  //     console.error("Error fetching movies watched:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const viewPastTickets = () => {
    setLoading(true);
    navigate('/past-tickets', { state: { pastShowtimeIds: tickets.map(ticket => ticket.showtime._id) } });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br pb-8 text-gray-900 sm:gap-8">
      <Navbar />
      <div className="mx-4 flex h-fit flex-col gap-4 rounded-md bg-gradient-to-br p-4 drop-shadow-xl sm:mx-8 sm:p-6">
          {
            showModal &&
            <Modal
              isOpen={showModal}
              onRequestClose={()=>{setShowModal(false)}}
              shouldCloseOnOverlayClick={false}
              contentLabel="Location Modal"
              className="modal w-full max-w-lg overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md z-90 border-4 border-solid border-gray-800"
            >
              <button align="right" className="close-btn" onClick={()=>setShowModal(false)}>close</button>
              <h2 className="text-2xl font-bold bg-white mb-4 rounded-t-md">
                Success
              </h2>
            </Modal>
          }
        <div className="mx-4 flex h-fit flex-row gap-4 p-4 drop-shadow-xl sm:mx-1 sm:p-2">
          <div className="flex items-center border-2 border-indigo-900 rounded-md w-1/2 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 py-9 px-4">Membership Type: {membership}</h2>
          </div>
          <div className="flex items-center border-2 border-indigo-900 rounded-md w-1/2 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 py-9 px-4">Reward Points: {rewardPoints}</h2>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">My Tickets</h2>
        {isFetchingticketsDone ? (
          tickets.length === 0 ? (
            <p className="text-center">
              You have not purchased any tickets yet
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1920px]:grid-cols-3">
              {tickets.map((ticket, index) => (
                <div className="flex flex-col" key={index}>
                  <ShowtimeDetails showtime={ticket.showtime} />
                  <div className="flex h-full flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
                    <div className="flex h-full flex-col items-center gap-x-4 px-4 py-2 md:flex-row">
                      <p className="whitespace-nowrap font-semibold">Seats:</p>
                      <p className="text-left">
                        {ticket.seats.map((seat) => `${seat.row}${seat.number}`).join(', ')}
                      </p>
                      <p className="whitespace-nowrap">({ticket.seats.length} seats)</p>
                    </div>
                    <button
                      onClick={() => handleCancelTicket(ticket._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <Loading />
        )
        
        }
     
{isFetchingticketsDone ? (
          tickets.length === 0 ? (
            <p className="text-center">
              You have not purchased any tickets yet
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1920px]:grid-cols-3">
              <button
              onClick={viewPastTickets}
              className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >Fetch Ra!</button>
              
              {/* <button
  onClick={async () => {
    setLoading(true);
    await fetchMoviesWatched(tickets.map(ticket => ticket.showtime._id));
    //console.log('showtimes frontend',tickets.map(ticket => ticket.showtime._id))
  }}
  className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
>
  Fetch Movies Watched
</button> */}
{loading ? (
  <Loading />
) : (
  <div>

  </div>
)}

            </div>
          )
        ) : (
          <Loading />
        )
        
        }
  
      </div>
    </div>
  );
};

export default Tickets;