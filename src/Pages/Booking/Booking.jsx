import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ButtonGroup } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import CustomTable from "../../Component/Table/Table";
import CustomBreadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import "./Booking.scss";

const Booking = () => {
  const [bookings] = useState([
    {
      id: 1,
      customerName: "Alice Johnson",
      bookingTime: "10:00 AM",
      date: "2024-06-01",
      players: 5,
      sport: "Football",
      turf: "Turf A",
      price: 1200,
    },
    {
      id: 2,
      customerName: "Bob Smith",
      bookingTime: "2:00 PM",
      date: "2024-06-02",
      players: 8,
      sport: "Cricket",
      turf: "Turf B",
      price: 2000,
    },
    {
      id: 3,
      customerName: "Charlie Lee",
      bookingTime: "6:00 PM",
      date: "2024-06-03",
      players: 4,
      sport: "Badminton",
      turf: "Turf C",
      price: 800,
    },
    {
      id: 4,
      customerName: "Charlie Lee",
      bookingTime: "6:00 PM",
      date: "2024-07-03",
      players: 4,
      sport: "Badminton",
      turf: "Turf C",
      price: 800,
    },
  ]);

  // Filter state
  const [filterName, setFilterName] = useState("");
  const [filterSport, setFilterSport] = useState("");
  const [filterTurf, setFilterTurf] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Add filter mode state
  const [dateMode, setDateMode] = useState("all"); // all, week, month

  // Unique sport and turf options
  const sportOptions = Array.from(new Set(bookings.map((b) => b.sport)));
  const turfOptions = Array.from(new Set(bookings.map((b) => b.turf)));

  // Date mode handlers
  const handleAllDay = () => {
    setDateMode("all");
    setStartDate("");
    setEndDate("");
  };
  const handleAllWeek = () => {
    setDateMode("week");
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const yyyyMmDd = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setStartDate(yyyyMmDd(monday));
    setEndDate(yyyyMmDd(sunday));
  };
  const handleAllMonth = () => {
    setDateMode("month");
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const yyyyMmDd = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setStartDate(yyyyMmDd(firstDay));
    setEndDate(yyyyMmDd(lastDay));
  };
  const handleReset = () => {
    setDateMode("all");
    setStartDate("");
    setEndDate("");
    setFilterName("");
    setFilterSport("");
    setFilterTurf("");
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((booking) => {
    const nameMatch = booking.customerName
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const sportMatch = filterSport ? booking.sport === filterSport : true;
    const turfMatch = filterTurf ? booking.turf === filterTurf : true;
    let dateMatch = true;
    if (startDate) {
      dateMatch = booking.date >= startDate;
    }
    if (endDate && dateMatch) {
      dateMatch = booking.date <= endDate;
    }
    return nameMatch && sportMatch && turfMatch && dateMatch;
  });

  const headers = [
    "Customer Name",
    "Booking Time",
    "Date",
    "Players",
    "Sport/Turf",
    "Price",
    "Actions",
  ];

  const tableData = filteredBookings.map((booking) => [
    booking.customerName,
    booking.bookingTime,
    booking.date,
    booking.players,
    `${booking.sport} / ${booking.turf}`,
    `₹${booking.price}`,
    <Button variant="link" className="p-0 action-ellipsis-btn">
      <FaEllipsisV size={18} />
    </Button>,
  ]);

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Bookings", path: "/booking" },
  ];

  return (
    <Container fluid className="booking-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h2 className="page-title">Bookings</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <div className="booking-filters">
            <Row className="g-3">
              <Col lg={3} md={6} sm={12}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Filter by customer name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <Form.Group>
                  <Form.Select
                    value={filterSport}
                    onChange={(e) => setFilterSport(e.target.value)}
                  >
                    <option value="">All Sports</option>
                    {sportOptions.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <Form.Group>
                  <Form.Select
                    value={filterTurf}
                    onChange={(e) => setFilterTurf(e.target.value)}
                  >
                    <option value="">All Turfs</option>
                    {turfOptions.map((turf) => (
                      <option key={turf} value={turf}>
                        {turf}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={5} md={12} sm={12}>
                <div className="d-flex gap-3 flex-wrap">
                  <ButtonGroup className="flex-grow-0">
                    <Button
                      variant={dateMode === "all" ? "primary" : "outline-secondary"}
                      onClick={handleAllDay}
                    >
                      All day
                    </Button>
                    <Button
                      variant={dateMode === "week" ? "primary" : "outline-secondary"}
                      onClick={handleAllWeek}
                    >
                      All week
                    </Button>
                    <Button
                      variant={dateMode === "month" ? "primary" : "outline-secondary"}
                      onClick={handleAllMonth}
                    >
                      All month
                    </Button>
                  </ButtonGroup>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setDateMode("");
                      }}
                      style={{ width: 140 }}
                    />
                    <span className="date-arrow">&rarr;</span>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setDateMode("");
                      }}
                      style={{ width: 140 }}
                    />
                  </div>
                  <Button variant="outline-secondary" onClick={handleReset} className="reset-btn ms-auto">
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            headers={headers}
            data={tableData}
            striped={true}
            hover={true}
            responsive={true}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Booking; 