"use client";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "./style.css";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    displayProducts();
  }, []);

  const displayProducts = () => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        setProducts(res.data);
        console.log("Data fetched:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete("http://localhost:3000/api/products", { data: { id } })
      .then((res) => {
        console.log("Deleted product", res.data);
        displayProducts();
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        setError("Failed to delete product");
      });
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product); 
    setShowEditModal(true); 
  };

  const handleSave = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    displayProducts(); 
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === "price" || name === "quantity" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProduct) {
      try {
        await axios.put(
          `http://localhost:3000/api/products/${editingProduct.id}`,
          editingProduct,
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

  return (
    <div>
      <Table striped bordered hover>
        {/* Tiêu đề */}
        <thead>
          <tr>
            <th className="font-title">STT</th>
            <th className="font-title">Tên sản phẩm</th>
            <th className="font-title">Hình ảnh</th>
            <th className="font-title">Giá</th>
            <th className="font-title">Số lượng</th>
            <th className="font-title">Chức năng</th>
          </tr>
        </thead>

        {/* Nội dung */}
        {products.map((pro, index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{pro.productName}</td>
              <td>{pro.image}</td>
              <td>{pro.price}</td>
              <td>{pro.quantity}</td>
              <td className="d-flex gap-2">
                <Button onClick={() => handleEdit(pro)}>Sửa</Button>
                <Button variant="danger" onClick={() => handleDelete(pro.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {/* Modal chỉnh sửa sản phẩm */}
      <Modal show={showEditModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingProduct && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={editingProduct.productName}
                  onChange={handleInputChange}
                  placeholder="Tên sản phẩm"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="productImage">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={editingProduct.image}
                  onChange={handleInputChange}
                  placeholder="Đường dẫn hình ảnh"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleInputChange}
                  placeholder="Giá sản phẩm"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="productQuantity">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={editingProduct.quantity}
                  onChange={handleInputChange}
                  placeholder="Số lượng"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Lưu sản phẩm
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="ms-2"
              >
                Hủy
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
