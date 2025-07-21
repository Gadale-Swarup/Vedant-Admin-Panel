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
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import CustomBreadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import CustomTable from "../../Component/Table/Table";
import "./Courses.scss";

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      instructor: "John Doe",
      category: "Programming",
      rating: 4.8,
      students: 156,
      status: "active",
    },
    {
      id: 2,
      title: "React Development",
      instructor: "Jane Smith",
      category: "Programming",
      rating: 4.9,
      students: 203,
      status: "active",
    },
    {
      id: 3,
      title: "Python for Beginners",
      instructor: "Mike Johnson",
      category: "Programming",
      rating: 4.7,
      students: 98,
      status: "pending",
    },
    {
      id: 4,
      title: "Data Science Basics",
      instructor: "Sarah Wilson",
      category: "Data Science",
      rating: 4.6,
      students: 134,
      status: "active",
    },
    {
      id: 5,
      title: "Web Design Mastery",
      instructor: "David Brown",
      category: "Design",
      rating: 4.5,
      students: 87,
      status: "active",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    rating: "",
    image: null,
  });

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Courses", path: "/courses" },
  ];

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      title: "",
      category: "",
      rating: "",
      image: null,
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      id: courses.length + 1,
      ...formData,
      students: 0,
      status: "active",
    };

    setCourses((prev) => [...prev, newCourse]);
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

  const getRatingStars = (rating) => {
    return (
      <div className="rating-stars">
        <FaStar className="text-warning" />
        <span className="ms-1">{rating}</span>
      </div>
    );
  };

  // Prepare table data
  const headers = ["Title", "Category", "Rating", "Status", "Actions"];
  const tableData = courses.map((course) => [
    course.title,
    course.category,
    getRatingStars(course.rating),
    getStatusBadge(course.status),
    <div className="action-buttons">
      <Button variant="outline-primary" size="sm" className="me-1">
        <FaEdit />
      </Button>
      <Button variant="outline-danger" size="sm">
        <FaTrash />
      </Button>
    </div>,
  ]);

  return (
    <Container fluid className="courses-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Courses</h2>
            <Button
              variant="primary"
              onClick={handleShow}
              className="add-course-btn"
              size="sm"
            >
              <FaPlus className="me-2" />
              Add Course
            </Button>
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

      {/* Add Course Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Data Science">Data Science</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Enter rating (1-5)"
                min="1"
                max="5"
                step="0.1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                className="file-input"
              />
              {formData.image && (
                <div className="image-preview mt-2">
                  <small className="text-muted">
                    Selected: {formData.image.name}
                  </small>
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              Add Course
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Courses;
