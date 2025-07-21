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
import { FaPlus, FaEdit, FaTrash, FaUserGraduate } from "react-icons/fa";
import CustomBreadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import CustomTable from "../../Component/Table/Table";
import "./Enrollment.css";

const EnrollmentStudent = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);
  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      studentName: "John Smith",
      course: "JavaScript Fundamentals",
      enrollmentDate: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      studentName: "Sarah Johnson",
      course: "React Development",
      enrollmentDate: "2024-01-20",
      status: "active",
    },
    {
      id: 3,
      studentName: "Mike Davis",
      course: "Python for Beginners",
      enrollmentDate: "2024-02-01",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Emily Wilson",
      course: "Data Science Basics",
      enrollmentDate: "2024-01-25",
      status: "active",
    },
    {
      id: 5,
      studentName: "David Brown",
      course: "Web Design Mastery",
      enrollmentDate: "2023-12-10",
      status: "completed",
    },
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    enrollmentDate: "",
  });

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Enrollments", path: "/enrollments" },
  ];

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingEnrollmentId(null);
    setFormData({
      studentName: "",
      course: "",
      enrollmentDate: "",
    });
  };

  const handleShow = () => {
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (enrollment) => {
    setIsEditMode(true);
    setEditingEnrollmentId(enrollment.id);
    setFormData({
      studentName: enrollment.studentName,
      course: enrollment.course,
      enrollmentDate: enrollment.enrollmentDate,
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
      // Update existing enrollment
      setEnrollments((prev) =>
        prev.map((enrollment) =>
          enrollment.id === editingEnrollmentId
            ? { ...enrollment, ...formData }
            : enrollment
        )
      );
    } else {
      // Add new enrollment
      const newEnrollment = {
        id: enrollments.length + 1,
        ...formData,
        status: "active",
      };
      setEnrollments((prev) => [...prev, newEnrollment]);
    }

    handleClose();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: "success",
      pending: "warning",
      completed: "info",
      inactive: "secondary",
    };
    return <Badge bg={statusColors[status]}>{status}</Badge>;
  };

  // Prepare table data
  const headers = [
    "Student Name",
    "Course",
    "Enrollment Date",
    "Status",
    "Actions",
  ];
  const tableData = enrollments.map((enrollment) => [
    <div className="enrollment-student-name">{enrollment.studentName}</div>,
    enrollment.course,
    new Date(enrollment.enrollmentDate).toLocaleDateString(),
    getStatusBadge(enrollment.status),
    <div className="action-buttons">
      <Button
        variant="outline-primary"
        size="sm"
        className="me-1"
        onClick={() => handleEdit(enrollment)}
      >
        <FaEdit />
      </Button>
      <Button variant="outline-danger" size="sm">
        <FaTrash />
      </Button>
    </div>,
  ]);

  return (
    <Container fluid className="enrollment-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Student Enrollments</h2>
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

      {/* Add/Edit Enrollment Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Enrollment" : "Add New Enrollment"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter student name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="">Select course</option>
                <option value="JavaScript Fundamentals">
                  JavaScript Fundamentals
                </option>
                <option value="React Development">React Development</option>
                <option value="Python for Beginners">
                  Python for Beginners
                </option>
                <option value="Data Science Basics">Data Science Basics</option>
                <option value="Web Design Mastery">Web Design Mastery</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enrollment Date</Form.Label>
              <Form.Control
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              {isEditMode ? "Update Enrollment" : "Add Enrollment"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default EnrollmentStudent;
