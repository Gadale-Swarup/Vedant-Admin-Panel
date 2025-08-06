import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import CustomBreadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import "./CourtBooking.scss";

const CourtBooking = () => {
  const [selectedSport, setSelectedSport] = useState("Badminton");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState("Synthetic Flooring Court - ₹500/hr");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const sports = [
    { id: "badminton", name: "Badminton", icon: "🏸" },
    { id: "cricket", name: "Cricket", icon: "🏏" },
    { id: "paddle", name: "Paddle", icon: "🏓" }
  ];

  const courts = [
    {
      id: "synthetic-flooring",
      name: "Synthetic Flooring Court",
      sport: "Badminton",
      price: "₹500/hr",
      description: "Professional indoor court with synthetic flooring",
      features: ["Professional lighting", "Air conditioning", "Premium flooring"]
    },
    {
      id: "outdoor-cricket",
      name: "Outdoor Cricket Ground",
      sport: "Cricket",
      price: "₹800/hr",
      description: "Full-size cricket ground with professional pitch",
      features: ["Professional pitch", "Boundary ropes", "Pavilion access"]
    },
    {
      id: "indoor-paddle",
      name: "Indoor Paddle Court",
      sport: "Paddle",
      price: "₹400/hr",
      description: "Dedicated paddle tennis court",
      features: ["Glass walls", "Professional surface", "Lighting system"]
    }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  // Generate date options for the next 14 days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const dateOptions = generateDateOptions();

  useEffect(() => {
    // Simulate loading available slots
    setLoading(true);
    setTimeout(() => {
      // Mock data - in real app, this would come from API
      const mockAvailableSlots = timeSlots.filter(() => Math.random() > 0.5);
      setAvailableSlots(mockAvailableSlots);
      setLoading(false);
    }, 1000);
  }, [selectedDate, selectedSport]);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    // Update court selection based on sport
    const availableCourts = courts.filter(court => court.sport === sport);
    if (availableCourts.length > 0) {
      setSelectedCourt(`${availableCourts[0].name} - ${availableCourts[0].price}`);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getCurrentCourt = () => {
    return courts.find(court => 
      `${court.name} - ${court.price}` === selectedCourt
    ) || courts[0];
  };



  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Court Booking", path: "/court-booking" },
  ];

  return (
    <Container className="court-booking-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="page-header">
            <h2 className="page-title">Court Booking</h2>
            <p className="page-subtitle">Select your preferred sport, date, and time</p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Make a Selection Card */}
        <Col lg={4}>
          <Card className="selection-card">
            <Card.Body>
              <h5 className="card-title mb-4">Make a Selection</h5>
              
              <Form.Group className="mb-4">
                <Form.Label className="form-label">Select Sport</Form.Label>
                <Form.Select 
                  value={selectedSport}
                  onChange={(e) => handleSportChange(e.target.value)}
                  className="sport-select"
                >
                  {sports.map(sport => (
                    <option key={sport.id} value={sport.name}>
                      {sport.icon} {sport.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label">Select Date</Form.Label>
                <div className="date-picker-container">
                  <div className="date-picker-scroll">
                    {dateOptions.map((date, index) => (
                      <div
                        key={index}
                        className={`date-card ${isSelected(date) ? 'selected' : ''} ${isToday(date) ? 'today' : ''}`}
                        onClick={() => handleDateSelect(date)}
                      >
                        <div className="date-day">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="date-number">
                          {date.getDate()}
                        </div>
                        {isToday(date) && (
                          <div className="today-label">Today</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label">Select Court</Form.Label>
                <Form.Select 
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="court-select"
                >
                  {courts
                    .filter(court => court.sport === selectedSport)
                    .map(court => (
                      <option key={court.id} value={`${court.name} - ${court.price}`}>
                        {court.name} - {court.price}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Available Time Slots Card */}
        <Col lg={8}>
          <Card className="slots-card">
            <Card.Body>
              <h5 className="card-title mb-4">Available Time Slots</h5>
              
              {loading ? (
                <div className="loading-slots">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading available slots...</p>
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="time-slots">
                  {availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot-card ${selectedTimeSlot === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <div className="time-text">{slot}</div>
                      <div className="available-text">Available</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-slots">
                  <p className="text-muted">No available time slots for the selected date and time.</p>
                </div>
              )}

              <div className="add-to-cart-section">
                <Button 
                  variant="primary" 
                  className="add-to-cart-btn"
                  disabled={availableSlots.length === 0}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Court Details Card */}
      <Row className="mt-4">
        <Col lg={4}>
          <Card className="court-details-card">
            <Card.Body>
              <h5 className="card-title mb-4">Court Details</h5>
              
              <div className="court-info">
                <h6 className="court-name">{getCurrentCourt().name}</h6>
                <p className="court-sport">{getCurrentCourt().sport}</p>
                <p className="court-description">
                  {getCurrentCourt().description}
                </p>
                <p className="court-prices">
                  Hourly Rate: {getCurrentCourt().price}
                </p>
                <p className="selected-date">
                  Selected Date: {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourtBooking; 