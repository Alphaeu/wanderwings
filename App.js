import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<AdvancedSearch />} />
            <Route path="/account" element={<ProfileCreation />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

