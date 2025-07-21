import React, { useState } from "react";
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
import "./Student.css";

const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      mobile: "01717171717",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      mobile: "01717171717",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      mobile: "01717171717",
      status: "pending",
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.w@email.com",
      mobile: "01717171717",
      status: "active",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@email.com",
      mobile: "01717171717",
      status: "inactive",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Students", path: "/students" },
  ];

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingStudentId(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const handleShow = () => {
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setIsEditMode(true);
    setEditingStudentId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      // Update existing student
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudentId
            ? { ...student, ...formData }
            : student
        )
      );
    } else {
      // Add new student
      const newStudent = {
        id: students.length + 1,
        ...formData,
        status: "active",
      };
      setStudents((prev) => [...prev, newStudent]);
    }

    handleClose();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: "success",
      pending: "warning",
      inactive: "secondary",
    };
    return <Badge bg={statusColors[status]}>{status}</Badge>;
  };

  // Prepare table data
  const headers = ["Name", "Email", "Mobile", "Status", "Actions"];
  const tableData = students.map((student) => [
    <div className="student-name">{student.name}</div>,
    student.email,
    student.mobile,
    getStatusBadge(student.status),
    <div className="action-buttons">
      <Button
        variant="outline-primary"
        size="sm"
        className="me-1"
        onClick={() => handleEdit(student)}
      >
        <FaEdit />
      </Button>
      <Button variant="outline-danger" size="sm">
        <FaTrash />
      </Button>
    </div>,
  ]);

  return (
    <Container fluid className="student-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Students</h2>
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

      {/* Add/Edit Student Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student name"
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              {isEditMode ? "Update Student" : "Add Student"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Student;
