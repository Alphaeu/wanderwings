import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { AdvancedSearch } from './components/FlightBooking';
import ProfileCreation from './components/AccountManagement/ProfileCreation';
import BookingHistory from './components/AccountManagement/BookingHistory';
import Notifications from './components/AccountManagement/Notifications';
import FlexibleDateSearch from './components/FlightBooking/FlexibleDateSearch';
import RealTimeAvailability from './components/FlightBooking/RealTimeAvailability';
import SeatSelection from './components/FlightBooking/SeatSelection';
import RealTimeFlightStatus from './components/FlightStatus/RealTimeFlightStatus';
import PushNotifications from './components/FlightStatus/PushNotifications';
import FrequentFlyerProgram from './components/LoyaltyProgram/FrequentFlyerProgram';
import PromotionsOffers from './components/LoyaltyProgram/PromotionsOffers';
import BaggageTracking from './components/AdditionalServices/BaggageTracking';
import TravelInsurance from './components/AdditionalServices/TravelInsurance';
import AirportTransfers from './components/AdditionalServices/AirportTransfers';
import LiveChatSupport from './components/CustomerSupport/LiveChatSupport';
import HelpCenter from './components/CustomerSupport/HelpCenter';
import UserReviews from './components/Feedback/UserReviews';
import FeedbackSystem from './components/Feedback/FeedbackSystem';
import UserDashboard from './components/AccountManagement/UserDashboard'; // New
import SearchBar from './components/SearchBar'; // New
import DynamicBanner from './components/DynamicBanner'; // New
import TrendingDestinations from './components/TrendingDestinations'; // New
import Login from './components/Authentication/Login'; // New
import Register from './components/Authentication/Register'; // New
import PasswordRecovery from './components/Authentication/PasswordRecovery'; // New
import FlightChart from './components/FlightChart'; // New
import { getSomeData } from './services/api'; // Import API function

function App() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSomeData(); // Fetch data from API
        setApiData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  // Sample data for FlightChart
  const flightData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [12, 19, 3, 5, 2, 3],
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <SearchBar /> {/* New */}
        <DynamicBanner /> {/* New */}
        <main className="container">
          {error && <p>Error: {error.message}</p>}
          {apiData ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<AdvancedSearch />} />
              <Route path="/account" element={<ProfileCreation />} />
              <Route path="/account/dashboard" element={<UserDashboard />} /> {/* New */}
              <Route path="/account/history" element={<BookingHistory />} />
              <Route path="/account/notifications" element={<Notifications />} />
              <Route path="/flights/flexible" element={<FlexibleDateSearch />} />
              <Route path="/flights/availability" element={<RealTimeAvailability />} />
              <Route path="/flights/seat-selection" element={<SeatSelection />} />
              <Route path="/flight-status" element={<RealTimeFlightStatus />} />
              <Route path="/flight-status/notifications" element={<PushNotifications />} />
              <Route path="/loyalty/frequent-flyer" element={<FrequentFlyerProgram />} />
              <Route path="/loyalty/promotions" element={<PromotionsOffers />} />
              <Route path="/services/baggage-tracking" element={<BaggageTracking />} />
              <Route path="/services/travel-insurance" element={<TravelInsurance />} />
              <Route path="/services/airport-transfers" element={<AirportTransfers />} />
              <Route path="/support/live-chat" element={<LiveChatSupport />} />
              <Route path="/support/help-center" element={<HelpCenter />} />
              <Route path="/feedback/reviews" element={<UserReviews />} />
              <Route path="/feedback/submit" element={<FeedbackSystem />} />
              <Route path="/login" element={<Login />} /> {/* New */}
              <Route path="/register" element={<Register />} /> {/* New */}
              <Route path="/password-recovery" element={<PasswordRecovery />} /> {/* New */}
            </Routes>
          ) : (
            <p>Loading...</p>
          )}
          <FlightChart data={flightData} /> {/* New */}
          <TrendingDestinations /> {/* New */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
