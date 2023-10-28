import Axios from 'axios'
import {  useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CustomNavbar from './CustomNavbar';
import CreateModal from './CreateModal';
import FilterModal from './FilterModal';
import giphy from '../assets/giphy.gif';
function MainPage() {
    const [data,setData] = useState([])
    const [error, setError] = useState(null)
    const [show, setShow] = useState({
        showCreateModal : false, 
        showFilterModal:false
    });
    const [loading, setLoading] = useState(false)
    const [searchId, setSearchId] = useState(""); // ID entered into the search bar
    const [searchResult, setSearchResult] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
   
    const fetchProducts = () => {
        setLoading(true)
        Axios.get("https://api.escuelajs.co/api/v1/products").then(res => {
            setLoading(false); 
            console.log(res.data);
            let products = res.data 
            products.sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt));
            let filteredData = res.data;
            if (selectedCategoryId) {
                filteredData = filteredData.filter(product => product.category.id === selectedCategoryId);
            }
            if (selectedPriceRange) {
                if (selectedPriceRange === 1) {
                    filteredData = filteredData.filter(product => product.price < 500);
                } else if (selectedPriceRange === 2) {
                    filteredData = filteredData.filter(product => product.price >= 500);
                }
            }
            setData(filteredData);
            handleCloseFilter()
            console.log("this is filtered data",data);
        }).catch(function(error){
            console.log(error);
    
        })
      }
      
     
useEffect(() => {
    if (!searchId || searchId.trim() === "") {
        fetchProducts();
        setSearchResult(null);
        return;
    }

    if (!Number.isInteger(Number(searchId))) {
        setError("Please enter a valid product ID.");
        return;
    }

    Axios.get(`https://api.escuelajs.co/api/v1/products/${searchId}`)
        .then(res => {
            setSearchResult(res.data);
            setError(null);
        })
        .catch(error => {
            console.error("Error fetching product:", error.response);
            if (error.response && error.response.data && error.response.data.message &&
                error.response.data.message.includes("Could not find any entity of type \"Product\"")) {
                setError("Product not found with the provided ID.");
            } else {
                setError("Error fetching product");
            }
        });
}, [searchId]);
const deleteProduct = (productId) => {
Axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`).then(res => {
    console.log(res.data);
    fetchProducts()
}).catch(error => {
    console.log(error);
})
}
 
const handleSearch = (e) => {
    const inputValue = e.target.value;

    setSearchId(inputValue);
    console.log("called" , e.target.value);
    if(!e.target.value){
        setError(null)

        return
    }
    
    if (!Number.isInteger(Number(searchId))) {
        setError("Please enter a valid product ID.");
        return;
    }

    Axios.get(`https://api.escuelajs.co/api/v1/products/${searchId}`)
        .then(res => {
            setSearchResult(res.data);
            setError(null);  // Clear any previous error messages
        })
        .catch(error => {
            console.error("Error fetching product:", error.response);

            // Check for the specific error message from the API
            if (error.response && error.response.data && error.response.data.message && 
                error.response.data.message.includes("Could not find any entity of type \"Product\"")) {
                setError("Product not found with the provided ID.");
            } else {
                setError("Error fetching product");
            }
        });
};
const handleShow = () => setShow({
    ...show, 
    showCreateModal:true
});
const handleClose = () => setShow({
    ...show, 
    showCreateModal:false
});
const handleOnClick = () => {
    setShow({
        ...show,
       showFilterModal:true
    })
}
const handleCloseFilter = () => {
    setShow({
        ...show,
       showFilterModal:false
    })
}
  return (

    <div className="App">
    {error && <p>{error}</p>}
    {loading 
            ? <img src={giphy} alt="Loading..." />
            :  <Container>
        <CustomNavbar handleFilter={handleOnClick} show={setShow} showFilter={show.showFilterModal} searchId={searchId} setSearchId={setSearchId} handleSearch={handleSearch}/>
        <Button className='mb-5' variant="primary" onClick={handleShow}>
            Create A product
        </Button>
        <CreateModal fetchProducts={fetchProducts}
         show={show.showCreateModal} handleClose={handleClose} setShow={show.showCreateModal}/>
        <FilterModal 
          handleCategoryChange={(e) => setSelectedCategoryId(Number(e.target.value))} 
  handlePriceChange={(e) => setSelectedPriceRange(Number(e.target.value))}
   show={show.showFilterModal} handleClose={handleCloseFilter}
   fetchProducts={fetchProducts}
   />
        {/* Display search result if exists */}
        {
            error ? <p>No products Found with this ID</p>: searchResult? (
            <Row>
                <Col md={4}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Img variant="top" src={searchResult.images?.length ?searchResult.images[0] :"https://picsum.photos/seed/picsum/200/300"}></Card.Img>
                            <Card.Title className='mt-4'> 
                                <span style={{color:"blue"}}>Product Name:</span> {searchResult.title}
                            </Card.Title>
                            <Card.Text className='fw-bold'>
                                {searchResult.description}
                            </Card.Text>
                            <Card.Subtitle className='mb-3'>
                                <span style={{color:"blue"}}>Price:</span> {searchResult.price} $
                            </Card.Subtitle>
                            <Button variant="danger" onClick={() => deleteProduct(searchResult.id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        ) : (
            <Row>
                {data.map((item) => (
                    <Col md={4} key={item.id}>
                        <Card style={{ width: '18rem'}}>
                            <Card.Body>
                                <Card.Img variant="top" src={item.images.length ?item.images[0] :"https://picsum.photos/seed/picsum/200/300"}></Card.Img>
                                <Card.Title className='mt-4'> 
                                    <span style={{color:"blue"}}>Product Name:</span> {item.title}
                                </Card.Title>
                                <Card.Text className='fw-bold'>
                                    {item.description}
                                </Card.Text>
                                <Card.Subtitle className='mb-3'>
                                    <span style={{color:"blue"}}>Price:</span> {item.price} $
                                </Card.Subtitle>
                                <Button variant="danger" onClick={() => deleteProduct(item.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )}
    </Container>}
</div>

  );
 
}

export default MainPage