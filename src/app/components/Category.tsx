'use client'
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

export default function Category() {
  const [category, setCategory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [editedTitle, setEditedTitle] = useState<string>("");

  const displayCategory = () => {
    axios
      .get("http://localhost:3000/api/category")
      .then((res) => {
        setCategory(res.data);
        console.log("Data fetched:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete("http://localhost:3000/api/category", { data: { id } })
      .then((res) => {
        console.log("Deleted category", res.data);
        displayCategory();
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
        setError("Failed to delete category");
      });
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setEditedTitle(category.title); 
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
   axios
     .put("http://localhost:3000/api/category", {
       id: selectedCategory.id,
       title: editedTitle,
     })
     .then((res) => {
       console.log("Category updated:", res.data);
       displayCategory();
       setShowEditModal(false);
     })
     .catch((err) => {
       console.error("Error updating category:", err);
       setError("Failed to update category");
     });
  };

    const handleSave = () => {
      setShowEditModal(false);
      setEditedTitle("");
      displayCategory();
    };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (editedTitle) {
    try {
      await axios.put(
        `http://localhost:3000/api/category/${selectedCategory.id}`,
        { title: editedTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleSave();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }
};

  useEffect(() => {
    displayCategory();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            <th>Sản phẩm</th>
            <th>Chức năng</th>
          </tr>
        </thead>

        {category.map((cat, index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{cat.title}</td>
              <td>{}</td>
              <td className="d-flex gap-2">
                <Button onClick={() => handleEdit(cat)}>Sửa</Button>
                <Button variant="danger" onClick={() => handleDelete(cat.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="editCategoryName">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Nhập tên danh mục mới"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
