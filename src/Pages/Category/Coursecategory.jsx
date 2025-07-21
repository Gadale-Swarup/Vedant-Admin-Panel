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
import { FaPlus, FaEdit, FaTrash, FaFolder } from "react-icons/fa";
import CustomBreadcrumb from "../../Component/Breadcrumb/Breadcrumb";
import CustomTable from "../../Component/Table/Table";
import "./Category.css";

const CourseCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Programming",
    },
    {
      id: 2,
      name: "Design",
    },
    {
      id: 3,
      name: "Data Science",
    },
    {
      id: 4,
      name: "Business",
    },
    {
      id: 5,
      name: "Marketing",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
  });

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Categories", path: "/categories" },
  ];

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingCategoryId(null);
    setFormData({
      name: "",
    });
  };

  const handleShow = () => {
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setIsEditMode(true);
    setEditingCategoryId(category.id);
    setFormData({
      name: category.name,
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
      // Update existing category
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategoryId
            ? { ...category, ...formData }
            : category
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        ...formData,
        status: "active",
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    handleClose();
  };

  // Prepare table data
  const headers = ["Category Name", "Actions"];
  const tableData = categories.map((category) => [
    <div className="category-name">{category.name}</div>,

    <div className="action-buttons">
      <Button
        variant="outline-primary"
        size="sm"
        className="me-1"
        onClick={() => handleEdit(category)}
      >
        <FaEdit />
      </Button>
      <Button variant="outline-danger" size="sm">
        <FaTrash />
      </Button>
    </div>,
  ]);

  return (
    <Container fluid className="category-container p-4">
      <Row className="mb-4">
        <Col>
          <CustomBreadcrumb items={breadcrumbItems} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Course Categories</h2>
            <Button
              variant="primary"
              onClick={handleShow}
              className="add-category-btn"
              size="sm"
            >
              <FaPlus className="me-2" />
              Add Category
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

      {/* Add/Edit Category Modal */}
      <Modal show={showModal} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Category" : "Add New Category"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="sm">
              {isEditMode ? "Update Category" : "Add Category"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CourseCategory;
