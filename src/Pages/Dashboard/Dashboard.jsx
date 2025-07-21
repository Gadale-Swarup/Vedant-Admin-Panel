import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { 
  FaUsers, 
  FaShoppingCart, 
  FaRupeeSign,
  FaBox,
  FaArrowUp,
  FaArrowDown,
  FaCalendar,
  FaCalendarCheck,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: { value: 0, change: 0 },
    totalOrders: { value: 0, change: 0 },
    totalCustomers: { value: 0, change: 0 },
    pendingBookings: { value: 0, change: 0 },
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [chartTab, setChartTab] = useState('7d');

  const mockData = {
    stats: {
      totalRevenue: { value: 82650, change: 11 },
      totalOrders: { value: 1645, change: 11 },
      totalCustomers: { value: 1462, change: -17 },
      pendingBookings: { value: 117, change: 5 },
    },
    recentBookings: [
      { id: "BK001", customer: "Alice Johnson", sport: "Football", date: "2024-05-28", time: "10:00 AM", amount: 1200 },
      { id: "BK002", customer: "Bob Smith", sport: "Cricket", date: "2024-05-28", time: "2:00 PM", amount: 2000 },
      { id: "BK003", customer: "Charlie Lee", sport: "Badminton", date: "2024-05-27", time: "4:30 PM", amount: 800 },
    ],
    upcomingSessions: [
      { id: "S001", sport: "Football Match", turf: "Turf A", time: "6:00 PM", date: "2024-06-05" },
    ],
    bookingData: [
      { date: "2024-05-20", bookings: 18, earnings: 2160 },
      { date: "2024-05-21", bookings: 22, earnings: 2640 },
      { date: "2024-05-22", bookings: 15, earnings: 1800 },
      { date: "2024-05-23", bookings: 25, earnings: 3000 },
      { date: "2024-05-24", bookings: 30, earnings: 3600 },
      { date: "2024-05-25", bookings: 28, earnings: 3360 },
      { date: "2024-05-26", bookings: 20, earnings: 2400 },
    ],
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStats(mockData.stats);
        setRecentBookings(mockData.recentBookings);
        setUpcomingSessions(mockData.upcomingSessions);
        setBookingData(mockData.bookingData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <Loader message="Loading Dashboard..." />;
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const StatCard = ({ title, value, change, icon, prefix = "" }) => (
    <Card className="dashboard-card stat-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="stat-title">{title}</h6>
            <p className="stat-period">Last 30 days</p>
          </div>
          <div className="stat-icon-wrapper">
            {icon}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end mt-3">
          <h3 className="stat-value mb-0">
            <CountUp end={value} duration={2} separator="," prefix={prefix} />
          </h3>
          {/* <span className={`stat-change ${change >= 0 ? 'text-success' : 'text-danger'}`}>
            {change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(change)}%
          </span> */}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="dashboard-container p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="welcome-header">Welcome Back!</h2>
          <p className="welcome-subheader">
            Here's what's happening with your academy today.
          </p>
        </Col>
        {/* <Col className="text-end">
          <Button variant="dark" className="view-all-btn">
            View All
          </Button>
        </Col> */}
      </Row>

      <Row className="stats-row mb-4">
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Revenue"
            value={stats.totalRevenue.value}
            change={stats.totalRevenue.change}
            icon={<FaRupeeSign />}
            prefix="₹"
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Bookings"
            value={stats.totalOrders.value}
            change={stats.totalOrders.change}
            icon={<FaCalendarCheck/>}
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Members"
            value={stats.totalCustomers.value}
            change={stats.totalCustomers.change}
            icon={<FaUsers />}
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Pending Bookings"
            value={stats.pendingBookings.value}
            change={stats.pendingBookings.change}
            icon={<FaCalendar/>}

          />
        </Col>
      </Row>

      <Row>
        <Col lg={12} className="mb-4">
          <Card className="dashboard-card chart-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3 chart-tabs-row">
                <h5 className="card-title mb-4">Booking Overview</h5>
                {/* <div className="chart-tabs">
                  <Button
                    variant={chartTab === '7d' ? 'primary' : 'outline-secondary'}
                    className={chartTab === '7d' ? 'chart-tab active' : 'chart-tab'}
                    onClick={() => setChartTab('7d')}
                  >
                    Last 7 days
                  </Button>
                  <Button
                    variant={chartTab === '30d' ? 'primary' : 'outline-secondary'}
                    className={chartTab === '30d' ? 'chart-tab active' : 'chart-tab'}
                    onClick={() => setChartTab('30d')}
                  >
                    Last 30 days
                  </Button>
                </div> */}
              </div>
              <div className="chart-area-wrapper" style={{ background: '#fff', borderRadius: 16, border: '1px solid #ececec', padding: 24 }}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={bookingData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5e81f4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5e81f4" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#43e97b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#43e97b" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis yAxisId="left" label={{ value: 'Bookings', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Earnings (₹)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }} />
                    <Tooltip labelFormatter={formatDate} formatter={(value, name) => name === "Earnings (₹)" ? [`₹${value}`, name] : [value, name]} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: 16, fontWeight: 500, fontSize: 14 }} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="bookings"
                      stroke="#5e81f4"
                      fillOpacity={1}
                      fill="url(#colorBookings)"
                      name="Bookings"
                      animationDuration={1500}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="earnings"
                      stroke="#43e97b"
                      fillOpacity={1}
                      fill="url(#colorEarnings)"
                      name="Earnings (₹)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Recent Bookings</h5>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => navigate("/booking")}
                >
                  View All
                </Button>
              </div>
              <div className="table-responsive">
                <Table hover className="data-table mb-0">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Sport</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.customer}</td>
                        <td>{booking.sport}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>₹{booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="card-title">Upcoming Sessions</h5>
                <Button variant="link" size="sm">
                  View All
                </Button>
              </div>
              <div className="table-responsive">
                <Table hover className="data-table mb-0">
                  <thead>
                    <tr>
                      <th>Sport/Event</th>
                      <th>Turf/Court</th>
                      <th>Time</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingSessions.map((session) => (
                      <tr key={session.id}>
                        <td>{session.sport}</td>
                        <td>{session.turf}</td>
                        <td>{session.time}</td>
                        <td>{session.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
