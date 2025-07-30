import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import CustomBreadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import CustomTable from "../../Component/Table/Table";
import { getUsers, createUser, updateUser, deleteUser } from "../../Apis/api";
import "./Users.scss";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    recordsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ role: "ALL", status: "ALL" });
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "STUDENT",
    active: true,
  });

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
  ];

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pagination.recordsPerPage,
        search: searchTerm,
        role: filters.role === "ALL" ? "" : filters.role,
        status: filters.status === "ALL" ? "" : filters.status,
      };
      const response = await getUsers(params);
      setUsers(response.data.data.records);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, [searchTerm, filters, pagination.currentPage]);


  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingUserId(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "STUDENT",
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
      active: user.active,
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
        await updateUser(editingUserId, formData);
      } else {
        await createUser(formData);
      }
      fetchUsers(pagination.currentPage);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers(pagination.currentPage);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      true: "success",
      false: "secondary",
    };
    return <Badge bg={statusColors[status]}>{status ? 'Active' : 'Inactive'}</Badge>;
  };

  const headers = ["Name", "Email", "Mobile", "Role", "Status", "Actions"];
  const tableData = users.map((user) => [
    <div className="user-name">{user.name}</div>,
    user.email,
    user.mobile,
    user.role,
    getStatusBadge(user.active),
    <div className="action-buttons">
      <Button
        variant="outline-primary"
        size="sm"
        className="me-1"
        onClick={() => handleEdit(user)}
      >
        <FaEdit />
      </Button>
      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}>
        <FaTrash />
      </Button>
    </div>,
  ]);

  return (
    <Container fluid className="user-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Users</h2>
            <Button variant="primary" onClick={handleShow}>
              <FaPlus className="me-2" /> Add User
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by name, email, or mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            name="role"
            value={filters.role}
            onChange={(e) => setFilters(prev => ({...prev, role: e.target.value}))}
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
            <option value="STAFF">Staff</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            name="status"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
          >
            <option value="ALL">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
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
            loading={loading}
          />
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
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
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
            <Button variant="primary" type="submit" size="sm">
              {isEditMode ? "Update User" : "Add User"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Users; 