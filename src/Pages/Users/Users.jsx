import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Badge,
  Table,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import "./Users.scss";

const Users = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [_editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "CUSTOMER",
    active: true,
  });

  // Mock user data to match the image
  const mockUsers = [
    {
      id: 1,
      name: "Player Sameer",
      email: "player.sameer@example.com",
      mobile: "+91 98765 43210",
      role: "CUSTOMER",
      status: "Active",
      joined: "09/04/2025",
      initials: "PS"
    },
    {
      id: 2,
      name: "Sameer Chikshe",
      email: "sameer.chikshe@example.com",
      mobile: "+91 98765 43211",
      role: "CUSTOMER",
      status: "Active",
      joined: "10/04/2025",
      initials: "SC"
    },
    {
      id: 3,
      name: "Player John",
      email: "player.john@example.com",
      mobile: "+91 98765 43212",
      role: "CUSTOMER",
      status: "Active",
      joined: "11/04/2025",
      initials: "PJ"
    },
    {
      id: 4,
      name: "Coach Anand",
      email: "coach.anand@example.com",
      mobile: "+91 98765 43213",
      role: "COACH",
      status: "Active",
      joined: "12/04/2025",
      initials: "CA"
    },
    {
      id: 5,
      name: "Shravani Joshi",
      email: "shravani.joshi@example.com",
      mobile: "+91 98765 43214",
      role: "CUSTOMER",
      status: "Active",
      joined: "13/04/2025",
      initials: "SJ"
    },
    {
      id: 6,
      name: "Admin Admin",
      email: "admin.admin@example.com",
      mobile: "+91 98765 43215",
      role: "ADMIN",
      status: "Active",
      joined: "15/04/2025",
      initials: "AA"
    }
  ];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingUserId(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "CUSTOMER",
      active: true,
    });
  };

  const handleShow = () => {
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setIsEditMode(true);
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.status === "Active",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // TODO: Implement update user API
        console.log('Updating user:', formData);
      } else {
        // TODO: Implement create user API
        console.log('Creating user:', formData);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const _handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // TODO: Implement delete user API
        console.log('Deleting user:', id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const getStatusBadge = (status) => {
    return (
      <Badge bg="success" className="status-badge">
        {status}
      </Badge>
    );
  };

  const getRoleDisplay = (role) => {
    const roleMap = {
      'CUSTOMER': 'Customer',
      'COACH': 'Coach',
      'ADMIN': 'Admin'
    };
    return roleMap[role] || role;
  };

  const UserRow = ({ user }) => (
    <tr>
      <td>
        <div className="user-info">
          <div className="user-avatar">
            {user.initials}
          </div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
          </div>
        </div>
      </td>
      <td className="role-cell">{getRoleDisplay(user.role)}</td>
      <td className="status-cell">{getStatusBadge(user.status)}</td>
      <td className="joined-cell">{user.joined}</td>
      <td className="actions-cell">
        <Button
          variant="outline-secondary"
          size="sm"
          className="edit-btn"
          onClick={() => handleEdit(user)}
        >
          <FaEdit /> Edit
        </Button>
      </td>
    </tr>
  );

  if (loading) {
    return <Loader message="Loading Users..." />;
  }

  return (
    <Container fluid className="users-container p-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="page-header">
            <h2 className="page-title">User Management</h2>
            <p className="page-subtitle">Manage users and their permissions</p>
          </div>
        </Col>
        <Col className="text-end"
        style={{
          textAlign: '-webkit-right',
        }}
        >
          <Button variant="primary" className="add-user-btn" onClick={handleShow}>
            <FaPlus /> Add User
          </Button>
        </Col>
      </Row>

      {/* Users Table Section */}
      <Row>
        <Col>
          <div className="users-card">
            <h5 className="mb-3">Users</h5>
            <div className="table-container">
              <Table className="users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter user name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                required
              />
            </Form.Group>
            {!isEditMode && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="CUSTOMER">Customer</option>
                <option value="COACH">Coach</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="user-active-switch"
                label="Active"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditMode ? "Update User" : "Add User"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Users; 