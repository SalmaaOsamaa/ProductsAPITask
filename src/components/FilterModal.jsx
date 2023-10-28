import React from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function FilterModal({ show, handleClose,handleCategoryChange,handlePriceChange,fetchProducts }) {

  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>Filter Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={e => e.preventDefault()}>
          <Form.Group controlId="productCategoryId">
            <Form.Label>Category ID</Form.Label>
            <Form.Control
             onChange={handleCategoryChange}
             aria-label="Default select example"
            placeholder='category id' 
             >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="productCategoryId">
            <Form.Label>price range</Form.Label>
            <Form.Select 
            onChange={handlePriceChange}
            aria-label="Default select example">
              <option>Choose Price Range</option>
              <option value="1">less than  500 $</option>
              <option value="2">above 500 $</option>
            </Form.Select>
          </Form.Group>
          <div className='d-flex justify-content-center m-4'>

<Button variant='success'
 onClick={fetchProducts}
 type='submit'>Filter</Button>
    <Button variant='error' onClick={handleClose}>Close</Button>
</div>
        </form>
      </Modal.Body>
    </Modal>

  )
}

export default FilterModal