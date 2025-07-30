import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import { GoClock } from 'react-icons/go'
import {
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaBox,
  FaArrowUp,
  FaArrowDown,
  FaCalendar,
  FaCalendarCheck
} from 'react-icons/fa'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import CountUp from 'react-countup'
import './Dashboard.scss'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Component/Loader/Loader'
import { LuCalendar, LuCreditCard, LuUsersRound } from 'react-icons/lu'
import Footer from '../../Component/Footer/Footer'

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRevenue: { value: 0, change: 0 },
    totalOrders: { value: 0, change: 0 },
    totalCustomers: { value: 0, change: 0 },
    totalCoaches: { value: 0, change: 0 }
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [bookingData, setBookingData] = useState([])
  const [chartTab, setChartTab] = useState('7d')

  const mockData = {
    stats: {
      totalRevenue: { value: 82650, change: 11 },
      totalOrders: { value: 1645, change: 11 },
      totalCoaches: { value: 1462, change: -17 },
      totalCustomers: { value: 117, change: 5 }
    },
    recentBookings: [
      {
        id: 'BK001',
        customer: 'Alice Johnson',
        sport: 'Football',
        date: '2024-05-28',
        time: '10:00 AM',
        amount: 1200,
        court: 'Synthetic Flooring Court',
        status: 'Paid'
      },
      {
        id: 'BK002',
        customer: 'Bob Smith',
        sport: 'Cricket',
        date: '2024-05-28',
        time: '2:00 PM',
        amount: 2000,
        court: 'Synthetic Flooring Court',
        status: 'Paid'
      },
      {
        id: 'BK003',
        customer: 'Charlie Lee',
        sport: 'Badminton',
        date: '2024-05-27',
        time: '4:30 PM',
        amount: 800,
        court: 'Wooden Flooring Court',
        status: 'Paid'
      }
    ],
    upcomingSessions: [
      {
        id: 'S001',
        sport: 'Football Match',
        turf: 'Turf A',
        time: '6:00 PM',
        date: '2024-06-05',
        court: 'Court 4'
      }
    ],
    bookingData: [
      { date: '2024-05-20', bookings: 18, earnings: 2160 },
      { date: '2024-05-21', bookings: 22, earnings: 2640 },
      { date: '2024-05-22', bookings: 15, earnings: 1800 },
      { date: '2024-05-23', bookings: 25, earnings: 3000 },
      { date: '2024-05-24', bookings: 30, earnings: 3600 },
      { date: '2024-05-25', bookings: 28, earnings: 3360 },
      { date: '2024-05-26', bookings: 20, earnings: 2400 }
    ],
    todaysCourtsUsage: [
      {
        court: 'Court 1',
        usage: 10
      },
      {
        court: 'Court 2',
        usage: 10
      }
    ]
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStats(mockData.stats)
        setRecentBookings(mockData.recentBookings)
        setUpcomingSessions(mockData.upcomingSessions)
        setBookingData(mockData.bookingData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <Loader message='Loading Dashboard...' />
  }

  const formatDate = dateStr => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const StatCard = ({ title, value, change, icon, prefix = '' }) => (
    <Card className='dashboard-card stat-card'>
      <Card.Body style={{ padding: '10px' }}>
        <div className='d-flex justify-content-between align-items-start'>
          <div>
            <h6 className='stat-title'>{title}</h6>
            <p className='stat-period'>Last 30 days</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end'>
          <h3 className='stat-value mb-0'>
            <CountUp end={value} duration={2} separator=',' prefix={prefix} />
          </h3>
          <div className='stat-icon-wrapper'>{icon}</div>
          {/* <span className={`stat-change ${change >= 0 ? 'text-success' : 'text-danger'}`}>
            {change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(change)}%
          </span> */}
        </div>
      </Card.Body>
    </Card>
  )

  return (
    <Container fluid className='dashboard-container p-4'>
      <Row className='mb-4 align-items-center'>
        <Col>
          <h2 className='welcome-header'>Admin Dashboard</h2>
          <p className='welcome-subheader'>
            Overview of the academy operations.
          </p>
        </Col>
        <Col className='text-end' style={{ marginBottom: '40px' }}>
          <Button
            variant='primary'
            className='view-all-btn'
            style={{ marginRight: '10px' }}
            onClick={() => navigate('/add-booking')}
          >
            Add Bookings
          </Button>
          <Button
            variant='primary'
            className='view-all-btn'
            onClick={() => navigate('/court-management')}
          >
            Manage Courts
          </Button>
        </Col>
      </Row>

      <Row className='stats-row mb-4'>
        <Col md={3} className='mb-3'>
          <StatCard
            title='Total Bookings'
            value={stats.totalOrders.value}
            change={stats.totalOrders.change}
            icon={<FaCalendarCheck size={28} color='blue' />}
          />
        </Col>
        <Col md={3} className='mb-3'>
          <StatCard
            title='Total Revenue'
            value={stats.totalRevenue.value}
            change={stats.totalRevenue.change}
            icon={<LuCreditCard size={28} color='green' />}
            prefix='₹'
          />
        </Col>

        <Col md={3} className='mb-3'>
          <StatCard
            title='Total Coaches'
            value={stats.totalCoaches.value}
            change={stats.totalCoaches.change}
            icon={<FaUsers size={28} color='orange' />}
          />
        </Col>
        <Col md={3} className='mb-3'>
          <StatCard
            title='Registered Customers'
            value={stats.totalCustomers.value}
            change={stats.totalCustomers.change}
            icon={<FaUsers size={28} />}
          />
        </Col>
      </Row>

      {/* <Row>
        <Col lg={12} className="mb-4">
          <Card className="dashboard-card chart-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3 chart-tabs-row">
                <h5 className="card-title mb-4">Booking Overview</h5>
               <div className="chart-tabs">
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
                </div> 
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
      </Row> */}
      <Row>
        <Card className='dashboard-card'>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <h5 className='card-title'>Recent Bookings</h5>
              <Button
                variant='link'
                size='sm'
                className='text-decoration-none'
                onClick={() => navigate('/booking')}
              >
                View All Courts
              </Button>
            </div>
            <div className='table-responsive'>
              <Table hover className='data-table mb-0'>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Court</th>
                    <th>Date & Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.customer}</td>
                      <td>{booking.court}</td>
                      <td>
                        {booking.date} <br /> {booking.time}
                      </td>
                      <td>₹{booking.amount}</td>
                      <td>
                        <span
                          className={`${
                            booking.status === 'Paid' ? 'paid' : 'pending'
                          }`}
                          style={{
                            color: booking.status === 'Paid' ? 'red' : 'white',
                            backgroundColor:
                              booking.status === 'Paid' ? '#FDC5BA' : '#43e97b',
                            borderRadius: '10px',
                            padding: '5px 10px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textTransform: 'lowercase',
                            width: '100px'
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Row>
      <Row className='mt-4'>
        <Card className='dashboard-card'>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <h5 className='card-title'>Todays Courts Usage</h5>
              <Button
                variant='link'
                size='sm'
                className='text-decoration-none'
                onClick={() => navigate('/court-management')}
              >
                Manage Courts
              </Button>
            </div>
            <div className='d-flex gap-3'>
              {/* Badminton Card */}
              <div
                className='card'
                style={{
                  width: '18rem',
                  height: '100px',
                  padding: '0px !important'
                }}
              >
                <div className='card-body p-0'>
                  <h5 className='card-title'>Badminton</h5>
                  <div className='mb-2 text-muted'>
                    <GoClock /> Bookings: <strong>4/16 hrs</strong>
                  </div>
                  <div
                    className='progress'
                    style={{ height: '10px', borderRadius: '10px' }}
                  >
                    <div
                      className='progress-bar bg-info'
                      role='progressbar'
                      style={{ width: `${(4 / 16) * 100}%` }}
                      aria-valuenow='4'
                      aria-valuemin='0'
                      aria-valuemax='16'
                    />
                  </div>
                </div>
              </div>

              {/* Cricket Card */}
              <div
                className='card'
                style={{
                  width: '18rem',
                  height: '100px',
                  padding: '0px !important'
                }}
              >
                <div className='card-body p-0'>
                  <h5 className='card-title'>Cricket</h5>
                  <div className='mb-2 text-muted'>
                    <GoClock /> Bookings: <strong>1/1 hrs</strong>
                  </div>
                  <div
                    className='progress'
                    style={{ height: '10px', borderRadius: '10px' }}
                  >
                    <div
                      className='progress-bar bg-info'
                      role='progressbar'
                      style={{ width: `100%` }}
                      aria-valuenow='1'
                      aria-valuemin='0'
                      aria-valuemax='1'
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Row>

      <Row className='mt-4'>
        <Col lg={6} className='mb-4'>
          <Card
            className='dashboard-card'
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Card.Body>
              <div className='d-flex flex-column align-items-center py-4'>
                <LuCalendar size={50} className='mb-3' color='#0099e5' />
                <h5
                  className='card-title text-center mb-2'
                  style={{ fontWeight: 'bold' }}
                >
                  Court Management
                </h5>
                <span
                  className='text-muted text-center'
                  style={{ fontSize: '14px', maxWidth: '300px' }}
                >
                  Add, edit, or remove courts and set rates
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className='mb-4'>
          <Card
            className='dashboard-card'
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Card.Body>
              <div className='d-flex flex-column align-items-center py-4'>
                <LuUsersRound size={50} className='mb-3' color='orange' />
                <h5
                  className='card-title text-center mb-2'
                  style={{ fontWeight: 'bold' }}
                >
                  User Management
                </h5>
                <span
                  className='text-muted text-center'
                  style={{ fontSize: '14px', maxWidth: '300px' }}
                >
                  View and Manage all Users.
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
