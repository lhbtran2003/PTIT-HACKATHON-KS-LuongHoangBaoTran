'use client'
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/Products";
import { Col, Container, Row } from "react-bootstrap";
import AddProduct from "./components/AddProduct";
import Category from "./components/Category";
import AddCategory from "./components/AddCategory";
export default function Home() {
  return (
    <div className="d-flex flex-column gap-5">
    
     
     
            <Products />
         
            <AddProduct />
        
          <Category/>
          <AddCategory/>
         
    </div>
  );
}
