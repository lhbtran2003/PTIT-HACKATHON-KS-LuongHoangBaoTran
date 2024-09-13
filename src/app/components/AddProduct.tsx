import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    image: "",
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products", product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Product added:", response.data); 
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <div>
      AddProduct
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
            placeholder="Tên sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImage">
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            placeholder="Đường dẫn hình ảnh"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Giá sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productQuantity">
          <Form.Label>Số lượng</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            placeholder="Số lượng"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Thêm sản phẩm
        </Button>
      </Form>
    </div>
  );
}
