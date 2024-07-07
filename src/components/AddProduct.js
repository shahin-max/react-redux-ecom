import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { addProduct } from '../redux/features/productSlice';
import { Modal } from 'react-bootstrap';

const AddProduct = ({ show, handleClose }) => {
    const [productData, setProductData] = useState({
        dish: '',
        imgdata: '',
        address: '',
        price: '',
        rating: '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct(productData));
        toast.success('Product added successfully!');
        setProductData({
            dish: '',
            imgdata: '',
            address: '',
            price: '',
            rating: '',
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="mb-4">
                    <Form.Group controlId="formDish">
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="dish"
                            value={productData.dish}
                            onChange={handleChange}
                            placeholder="Enter dish name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formImgdata">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="imgdata"
                            value={productData.imgdata}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={productData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="text"
                            name="rating"
                            value={productData.rating}
                            onChange={handleChange}
                            placeholder="Enter rating"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-3'>
                        Add Product
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>

    );
};

export default AddProduct;
