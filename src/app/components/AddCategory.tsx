import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function AddCategory() {
  const [category, setCategory] = useState({
    title: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/category", category, {
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
      AddCategory
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={category.title}
            onChange={handleInputChange}
            placeholder="Tên sản phẩm"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Thêm sản phẩm
        </Button>
      </Form>
    </div>
  );
}
