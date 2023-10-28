import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios'

function CreateModal({show,handleClose,fetchProducts}) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: '',   
        images: '' 
        
    });
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")
    const handleCreateProduct = async (e) => {
        e.preventDefault();

        // Validation check for positive price
        if (formData.price <= 0) {
            setError("Price must be a positive number");
            return;
        }

        try {
            const response = await Axios.post('https://api.escuelajs.co/api/v1/products/', {
                title: formData.title,
                price: parseFloat(formData.price),  // Ensure price is a float
                description: formData.description,
                categoryId: parseInt(formData.categoryId), // Convert categoryId to integer
                images: formData.images.split(';') // Split image URLs by ';' to create an array
            });
            setShowConfirmation(true)
            handleClose()
            fetchProducts()
        } catch (error) {
            console.log(error);
            setMessage(`error : ${error.message}`)
        }
    };

  return (
    <div>
   
     <Modal show={show} onHide={handleClose}>
  
    <Modal.Header closeButton>
        <Modal.Title>Add product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form onSubmit={handleCreateProduct}> 
         
                <Form.Group controlId="productCategoryId">
                            <Form.Label>Category ID</Form.Label>
                            <Form.Control type="text" name="categoryId" value={formData.categoryId || ''} 
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        categoryId: e.target.value
                                    });
                                }} placeholder="Category ID" />
                        </Form.Group>
                <Form.Group controlId="productTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={
                            (e)=>{
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }
                        } placeholder="Product Title" />
                    </Form.Group>
               
                <Form.Group controlId="productPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} 
                        onChange={
                            (e)=>{
                                setFormData({
                                    ...formData,
                                    price: e.target.value
                                })
                            }
                        }
                         placeholder="Product Price" />
                    </Form.Group>

             
              
                <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} 
                    onChange={
                            (e)=>{
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                        }
                         placeholder="Product Description" />
                    </Form.Group>
           
                <Form.Group controlId="productImages">
                            <Form.Label>Image URLs (Separate multiple URLs with a semicolon)</Form.Label>
                            <Form.Control type="text" name="images" value={formData.images || ''} 
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        images: e.target.value
                                    });
                                }} placeholder="Image URLs" />
                        </Form.Group>
              
               
           
            <div className='d-flex justify-content-center m-4'>

            <Button variant='success' type='submit'>Submit</Button>
                <Button variant='error' onClick={handleClose}>Close</Button>
            </div>
            </form>
    </Modal.Body>
    </Modal>
       </div>
  )
}

export default CreateModal