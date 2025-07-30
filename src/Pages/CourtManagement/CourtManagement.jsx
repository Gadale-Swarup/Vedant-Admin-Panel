import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Badge,
  Modal,
  Form
} from 'react-bootstrap'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Component/Loader/Loader'
import './CourtManagement.scss'

const CourtManagement = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('courts')
  const [selectedSport, setSelectedSport] = useState('All Sports')
  const [courts, setCourts] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  
  // Calendar state
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Modal state
  const [showAddTimeSlotModal, setShowAddTimeSlotModal] = useState(false)
  const [modalSelectedDate, setModalSelectedDate] = useState(new Date())
  const [modalCurrentMonth, setModalCurrentMonth] = useState(new Date())
  const [selectedCourt, setSelectedCourt] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  // Add Court Modal state
  const [showAddCourtModal, setShowAddCourtModal] = useState(false)
  const [courtName, setCourtName] = useState('')
  const [courtSport, setCourtSport] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [courtDescription, setCourtDescription] = useState('')

  // Add Sport Modal state
  const [showAddSportModal, setShowAddSportModal] = useState(false)
  const [sportName, setSportName] = useState('')
  const [sportDescription, setSportDescription] = useState('')

  // Mock data for courts
  const mockCourts = [
    {
      id: 1,
      name: 'Wooden Flooring Court',
      sport: 'Badminton',
      price: 700,
      description: 'Professional indoor court with wooden flooring',
      image: null
    },
    {
      id: 2,
      name: 'Synthetic Flooring Court',
      sport: 'Badminton',
      price: 500,
      description: 'Professional indoor court with synthetic flooring',
      image: null
    },
    {
      id: 3,
      name: 'Outdoor Court',
      sport: 'Badminton',
      price: 500,
      description: 'Professional outdoor court with synthetic flooring',
      image: null
    },
    {
      id: 4,
      name: 'Cricket Ground',
      sport: 'Cricket',
      price: 2000,
      description: 'Professional cricket ground with proper pitch',
      image: null
    },
    {
      id: 5,
      name: 'Football Turf',
      sport: 'Football',
      price: 1500,
      description: 'Professional football turf with artificial grass',
      image: null
    }
  ]

  // Mock data for time slots
  const mockTimeSlots = [
    {
      id: 1,
      name: 'Morning Slot',
      startTime: '06:00',
      endTime: '12:00',
      sport: 'All Sports',
      price: 500
    },
    {
      id: 2,
      name: 'Afternoon Slot',
      startTime: '12:00',
      endTime: '18:00',
      sport: 'All Sports',
      price: 700
    },
    {
      id: 3,
      name: 'Evening Slot',
      startTime: '18:00',
      endTime: '22:00',
      sport: 'All Sports',
      price: 800
    }
  ]

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCourts(mockCourts)
        setTimeSlots(mockTimeSlots)
      } catch (error) {
        console.error('Error loading court management data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calendar functions
  const getDaysInMonth = date => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    return { daysInMonth, startingDay }
  }

  const generateCalendarDays = (currentMonthDate, selectedDate) => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonthDate)
    const days = []
    
    // Previous month days
    const prevMonth = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() - 1,
      0
    )
    const prevMonthDays = prevMonth.getDate()
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          currentMonthDate.getFullYear(),
          currentMonthDate.getMonth() - 1,
          prevMonthDays - i
        ),
        isCurrentMonth: false,
        isSelected: false
      })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentMonthDate.getFullYear(),
        currentMonthDate.getMonth(),
        i
      )
      days.push({
        date,
        isCurrentMonth: true,
        isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
      })
    }
    
    // Next month days
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(
          currentMonthDate.getFullYear(),
          currentMonthDate.getMonth() + 1,
          i
        ),
        isCurrentMonth: false,
        isSelected: false
      })
    }
    
    return days
  }

  const handleDateClick = date => {
    setSelectedDate(date)
  }

  const handleModalDateClick = date => {
    setModalSelectedDate(date)
  }

  const handleMonthChange = direction => {
    const newMonth = new Date(currentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const handleModalMonthChange = direction => {
    const newMonth = new Date(modalCurrentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setModalCurrentMonth(newMonth)
  }

  const formatDate = date => {
    const options = { year: 'numeric', month: 'long' }
    return date.toLocaleDateString('en-US', options)
  }

  const formatSelectedDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const handleAddTimeSlot = () => {
    setShowAddTimeSlotModal(true)
    setModalSelectedDate(new Date())
    setModalCurrentMonth(new Date())
    setSelectedCourt('')
    setStartTime('')
    setEndTime('')
  }

  const handleCloseModal = () => {
    setShowAddTimeSlotModal(false)
  }

  const handleSubmitTimeSlot = () => {
    // TODO: Implement time slot creation
    console.log('Adding time slot:', {
      court: selectedCourt,
      date: modalSelectedDate,
      startTime,
      endTime
    })
    handleCloseModal()
  }

  const handleEditCourt = court => {
    // TODO: Implement edit functionality
    console.log('Edit court:', court)
  }

  const handleDeleteCourt = courtId => {
    // TODO: Implement delete functionality
    console.log('Delete court:', courtId)
    setCourts(courts.filter(court => court.id !== courtId))
  }

  const handleEditTimeSlot = timeSlot => {
    // TODO: Implement edit functionality
    console.log('Edit time slot:', timeSlot)
  }

  const handleDeleteTimeSlot = timeSlotId => {
    // TODO: Implement delete functionality
    console.log('Delete time slot:', timeSlotId)
    setTimeSlots(timeSlots.filter(slot => slot.id !== timeSlotId))
  }

  const handleAddCourt = () => {
    setShowAddCourtModal(true)
    setCourtName('')
    setCourtSport('')
    setHourlyRate('')
    setCourtDescription('')
  }

  const handleCloseCourtModal = () => {
    setShowAddCourtModal(false)
  }

  const handleSubmitCourt = () => {
    // TODO: Implement court creation
    console.log('Adding court:', {
      name: courtName,
      sport: courtSport,
      hourlyRate,
      description: courtDescription
    })
    handleCloseCourtModal()
  }

  const handleAddSport = () => {
    setShowAddSportModal(true)
    setSportName('')
    setSportDescription('')
  }

  const handleCloseSportModal = () => {
    setShowAddSportModal(false)
  }

  const handleSubmitSport = () => {
    // TODO: Implement sport creation
    console.log('Adding sport:', {
      name: sportName,
      description: sportDescription
    })
    handleCloseSportModal()
  }

  // Generate time options for dropdowns
  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(time)
      }
    }
    return times
  }

  const CourtCard = ({ court }) => (
    <Card className='court-card'>
      <div className='court-image-placeholder'>
        <span className='court-type'>{court.name}</span>
      </div>
      <Card.Body className='court-details'>
        <div className='court-header'>
          <h6 className='court-name'>{court.name}</h6>
          <span className='court-price'>₹{court.price}/hr</span>
        </div>
        <p className='court-sport'>{court.sport}</p>
        <p className='court-description'>{court.description}</p>
        <div className='court-actions'>
          <Button
            variant='outline-info'
            size='md'
            className='edit-btn'
            onClick={() => handleEditCourt(court)}
          >
            <FaEdit /> Edit
          </Button>
          <Button
            variant='danger'
            size='md'
            className='btn'
            onClick={() => handleDeleteCourt(court.id)}
          >
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  )

  const TimeSlotCard = ({ timeSlot }) => (
    <Card className='time-slot-card'>
      <Card.Body>
        <div className='time-slot-header'>
          <h6 className='time-slot-name'>{timeSlot.name}</h6>
          <span className='time-slot-price'>₹{timeSlot.price}/hr</span>
        </div>
        <p className='time-slot-time'>
          {timeSlot.startTime} - {timeSlot.endTime}
        </p>
        <p className='time-slot-sport'>{timeSlot.sport}</p>
        <div className='time-slot-actions'>
          <Button
            variant='outline-secondary'
            size='sm'
            className='edit-btn'
            onClick={() => handleEditTimeSlot(timeSlot)}
          >
            <FaEdit /> Edit
          </Button>
          <Button
            variant='outline-danger'
            size='sm'
            className='delete-btn'
            onClick={() => handleDeleteTimeSlot(timeSlot.id)}
          >
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  )

  if (loading) {
    return <Loader message='Loading Court Management...' />
  }

  return (
    <Container fluid className='court-management-container p-4'>
      {/* Header Section */}
      <Row>
        <Col>
          <div className='page-header'>
            <h2 className='page-title'>Court Management</h2>
            <p className='page-subtitle'>
              Add, edit, or remove courts and time slots
            </p>
          </div>

          {/* Tabs */}
          <div className='tab-container'>
            <Button
              variant={
                activeTab === 'courts' ? 'btn-outline' : 'outline-secondary'
              }
              className={` tab-button ${
                activeTab === 'courts' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('courts')}
            >
              Courts
            </Button>
            <Button
              variant={
                activeTab === 'timeSlots' ? 'primary' : 'outline-secondary'
              }
              className={`tab-button ${
                activeTab === 'timeSlots' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('timeSlots')}
            >
              Time Slots
            </Button>
          </div>
        </Col>
      </Row>

      {/* Header Actions Section */}
      <Row className='mb-4'>
        <Col>
          <div className='header-actions-container'>
            <Dropdown className='sport-filter'>
              <Dropdown.Toggle
                variant='outline-secondary'
                className='filter-dropdown'
              >
                {selectedSport} 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedSport('All Sports')}>
                  All Sports
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedSport('Badminton')}>
                  Badminton
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedSport('Cricket')}>
                  Cricket
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedSport('Football')}>
                  Football
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <div className='action-buttons'>
              <Button
                variant='outline-secondary'
                className='add-sport-btn'
                onClick={handleAddSport}
              >
                <FaPlus /> Add Sport
              </Button>
              
              {activeTab === 'courts' ? (
                <Button
                  variant='primary'
                  className='add-court-btn'
                  onClick={handleAddCourt}
                >
                  <FaPlus /> Add Court
                </Button>
              ) : (
                <Button
                  variant='primary'
                  className='add-time-slot-btn'
                  onClick={handleAddTimeSlot}
                >
                  <FaPlus /> Add Time Slot
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Content Section */}
      <Row
        style={{
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          marginBottom: '20px'
        }}
      >
        <Col>
          {activeTab === 'courts' ? (
            <div className='courts-section'>
              <h4 className='section-title1'>Courts ({courts.length})</h4>
              <Row className='courts-grid'>
                {courts.map(court => (
                  <Col key={court.id} lg={4} md={4} sm={6} className='mb-3'>
                    <CourtCard court={court} />
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <div className='time-slots-section'>
              <div className='time-slots-layout'>
                {/* Left Panel - Date Selection and Filtering */}
                <div className='left-panel'>
                  <div className='date-selection-card'>
                    <h5 className='panel-title'>Select Date</h5>
                    <div className='calendar-component'>
                      <div className='calendar-header'>
                        <button 
                          className='calendar-nav-btn'
                          onClick={() => handleMonthChange('prev')}
                        >
                          <FaChevronLeft />
                        </button>
                        <span className='calendar-month'>
                          {formatDate(currentMonth)}
                        </span>
                        <button 
                          className='calendar-nav-btn'
                          onClick={() => handleMonthChange('next')}
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                      <div className='calendar-days'>
                        <div className='day-header'>Su</div>
                        <div className='day-header'>Mo</div>
                        <div className='day-header'>Tu</div>
                        <div className='day-header'>We</div>
                        <div className='day-header'>Th</div>
                        <div className='day-header'>Fr</div>
                        <div className='day-header'>Sa</div>
                      </div>
                      <div className='calendar-dates'>
                        {generateCalendarDays(currentMonth, selectedDate).map((day, index) => (
                          <div
                            key={index}
                            className={`date-item ${
                              !day.isCurrentMonth ? 'prev-month' : ''
                            } ${day.isSelected ? 'selected' : ''}`}
                            onClick={() => handleDateClick(day.date)}
                          >
                            {day.date.getDate()}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className='filter-section'>
                      <label className='filter-label'>Filter by Court</label>
                      <Dropdown className='court-filter'>
                        <Dropdown.Toggle
                          variant='outline-secondary'
                          className='court-dropdown'
                        >
                          All Courts 
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>All Courts</Dropdown.Item>
                          <Dropdown.Item>Wooden Flooring Court</Dropdown.Item>
                          <Dropdown.Item>
                            Synthetic Flooring Court
                          </Dropdown.Item>
                          <Dropdown.Item>Outdoor Court</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    
                    <Button
                      variant='primary'
                      className='add-time-slot-btn-panel'
                      onClick={handleAddTimeSlot}
                    >
                      <FaPlus /> Add Time Slot
                    </Button>
                  </div>
                </div>
                
                {/* Right Panel - Time Slots Table */}
                <div className='right-panel'>
                  <div className='time-slots-card'>
                    <h5 className='panel-title'>
                      Time Slots for {formatSelectedDate(selectedDate)}
                    </h5>
                    <div className='table-container'>
                      <table className='time-slots-table'>
                        <thead>
                          <tr>
                            <th>Court</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Synthetic Flooring Court</td>
                            <td>10:00:00 - 11:00:00</td>
                            <td>
                              <span className='status-badge available'>
                                Available
                              </span>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <Button
                                  variant='outline-secondary'
                                  size='sm'
                                  className='edit-action-btn'
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant='danger'
                                  size='sm'
                                  className='delete-action-btn'
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Synthetic Flooring Court</td>
                            <td>11:00:00 - 12:00:00</td>
                            <td>
                              <span className='status-badge available'>
                                Available
                              </span>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <Button
                                  variant='outline-secondary'
                                  size='sm'
                                  className='edit-action-btn'
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant='danger'
                                  size='sm'
                                  className='delete-action-btn'
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Synthetic Flooring Court</td>
                            <td>12:00:00 - 13:00:00</td>
                            <td>
                              <span className='status-badge available'>
                                Available
                              </span>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <Button
                                  variant='outline-secondary'
                                  size='sm'
                                  className='edit-action-btn'
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant='danger'
                                  size='sm'
                                  className='delete-action-btn'
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Synthetic Flooring Court</td>
                            <td>13:00:00 - 14:00:00</td>
                            <td>
                              <span className='status-badge available'>
                                Available
                              </span>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <Button
                                  variant='outline-secondary'
                                  size='sm'
                                  className='edit-action-btn'
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant='danger'
                                  size='sm'
                                  className='delete-action-btn'
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Synthetic Flooring Court</td>
                            <td>14:00:00 - 15:00:00</td>
                            <td>
                              <span className='status-badge booked'>
                                Booked
                              </span>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <Button
                                  variant='outline-secondary'
                                  size='sm'
                                  className='edit-action-btn'
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant='danger'
                                  size='sm'
                                  className='delete-action-btn'
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Synthetic Flooring Court</td>
                            <td>15:00:00 - 16:00:00</td>
                            <td>
                              <span className='status-badge available'>
                                Available
                              </span>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <Button
                                  variant='outline-secondary'
                                  size='sm'
                                  className='edit-action-btn'
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant='danger'
                                  size='sm'
                                  className='delete-action-btn'
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* Add Time Slot Modal */}
      <Modal
        show={showAddTimeSlotModal}
        onHide={handleCloseModal}
        centered
        className='add-time-slot-modal'
      >
        <Modal.Header className='modal-header'>
          <Modal.Title className='modal-title'>Add New Time Slot</Modal.Title>
          <Button
            variant='link'
            className='close-btn'
            onClick={handleCloseModal}
          >
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <p className='modal-subtitle'>Fill in the details to add a new time slot.</p>
          
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Court</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='outline-secondary'
                  className='court-dropdown-modal'
                >
                  {selectedCourt || 'Select Court'}  
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {courts.map(court => (
                    <Dropdown.Item
                      key={court.id}
                      onClick={() => setSelectedCourt(court.name)}
                    >
                      {court.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Date</Form.Label>
              <div className='modal-calendar-component'>
                <div className='modal-calendar-header'>
                  <button 
                    className='modal-calendar-nav-btn'
                    onClick={() => handleModalMonthChange('prev')}
                  >
                    <FaChevronLeft />
                  </button>
                  <span className='modal-calendar-month'>
                    {formatDate(modalCurrentMonth)}
                  </span>
                  <button 
                    className='modal-calendar-nav-btn'
                    onClick={() => handleModalMonthChange('next')}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className='modal-calendar-days'>
                  <div className='modal-day-header'>Su</div>
                  <div className='modal-day-header'>Mo</div>
                  <div className='modal-day-header'>Tu</div>
                  <div className='modal-day-header'>We</div>
                  <div className='modal-day-header'>Th</div>
                  <div className='modal-day-header'>Fr</div>
                  <div className='modal-day-header'>Sa</div>
                </div>
                <div className='modal-calendar-dates'>
                  {generateCalendarDays(modalCurrentMonth, modalSelectedDate).map((day, index) => (
                    <div
                      key={index}
                      className={`modal-date-item ${
                        !day.isCurrentMonth ? 'prev-month' : ''
                      } ${day.isSelected ? 'selected' : ''}`}
                      onClick={() => handleModalDateClick(day.date)}
                    >
                      {day.date.getDate()}
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Start Time</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant='outline-secondary'
                      className='time-dropdown'
                    >
                      {startTime || 'Select Time'}  
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {generateTimeOptions().map(time => (
                        <Dropdown.Item
                          key={time}
                          onClick={() => setStartTime(time)}
                        >
                          {time}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>End Time</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant='outline-secondary'
                      className='time-dropdown'
                    >
                      {endTime || 'Select Time'}  
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {generateTimeOptions().map(time => (
                        <Dropdown.Item
                          key={time}
                          onClick={() => setEndTime(time)}
                        >
                          {time}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant='outline-secondary' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSubmitTimeSlot}>
            Add Time Slot
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Court Modal */}
      <Modal
        show={showAddCourtModal}
        onHide={handleCloseCourtModal}
        centered
        className='add-court-modal'
      >
        <Modal.Header className='modal-header'>
          <Modal.Title className='modal-title'>Add New Court</Modal.Title>
          <Button
            variant='link'
            className='close-btn'
            onClick={handleCloseCourtModal}
          >
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <p className='modal-subtitle'>Fill in the details to add a new court.</p>
          
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Court Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter court name'
                value={courtName}
                onChange={e => setCourtName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Sport</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='outline-secondary'
                  className='sport-dropdown-modal'
                >
                  {courtSport || 'Select Sport'}  
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setCourtSport('Badminton')}>
                    Badminton
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCourtSport('Cricket')}>
                    Cricket
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCourtSport('Football')}>
                    Football
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Hourly Rate (₹)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter hourly rate'
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter court description'
                value={courtDescription}
                onChange={e => setCourtDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant='outline-secondary' onClick={handleCloseCourtModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSubmitCourt}>
            Add Court
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Sport Modal */}
      <Modal
        show={showAddSportModal}
        onHide={handleCloseSportModal}
        centered
        className='add-sport-modal'
      >
        <Modal.Header className='modal-header'>
          <Modal.Title className='modal-title'>Add New Sport</Modal.Title>
          <Button
            variant='link'
            className='close-btn'
            onClick={handleCloseSportModal}
          >
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <p className='modal-subtitle'>Fill in the details to add a new sport.</p>
          
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Sport Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter sport name'
                value={sportName}
                onChange={e => setSportName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter sport description'
                value={sportDescription}
                onChange={e => setSportDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant='outline-secondary' onClick={handleCloseSportModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSubmitSport}>
            Add Sport
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CourtManagement
