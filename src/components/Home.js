import React, { useState } from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardsData from "./CardData";
import { addToCart, removeToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import AddProduct from './AddProduct';

const Home = () => {
    const [cartData, setCartData] = useState(CardsData);
    const [editing, setEditing] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [sorted, setSorted] = useState(false);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Add to cart
    const send = (item) => {
        dispatch(addToCart(item));
        toast.success("Item added to your cart");
    };

    // Delete product
    const deleteProduct = (id) => {
        setCartData(cartData.filter(item => item.id !== id));
        toast.success("Product deleted");
    };

    // Edit product
    const editProduct = (item) => {
        setEditing(item.id);
        setEditedData(item);
    };

    // Save edited product
    const saveProduct = (id) => {
        setCartData(cartData.map(item => item.id === id ? editedData : item));
        setEditing(null);
        toast.success("Product updated");
    };

    // Handle change for edited product
    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    // Sort products by price
    const sortByPrice = () => {
        const sortedData = [...cartData].sort((a, b) => a.price - b.price);
        setCartData(sortedData);
        setSorted(true);
    };

    // Clear sort
    const clearSort = () => {
        setCartData(CardsData);
        setSorted(false);
    };

    return (
        <>
            <section className='iteam_section mt-4 container'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2>Products</h2>
                    <div>
                        <Button onClick={sortByPrice} style={{ marginRight: "10px", background: "#ff3054db", border: "none" }}>
                            Sort by Price
                        </Button>
                        {sorted && (
                            <Button onClick={clearSort} style={{ background: "#ff3054db", border: "none" }}>
                                ✖
                            </Button>
                        )}
                    </div>
                    <Button onClick={handleShow} style={{ marginRight: "10px", background: "#ff3054db", border: "none" }}>
                        Add a product
                    </Button>
                </div>
                <div className='row mt-2 d-flex justify-content-around align-items-center'>
                    {cartData.map((element, index) => (
                        <Card key={index} style={{ width: "22rem", border: "none" }} className='hove mb-4'>
                            <Card.Img variant='top' className='cd' src={element.imgdata} />
                            <div className="card_body">
                                {editing === element.id ? (
                                    <>
                                        <input type="text" name="dish" value={editedData.dish} onChange={handleChange} />
                                        <input type="text" name="address" value={editedData.address} onChange={handleChange} />
                                        <input type="number" name="price" value={editedData.price} onChange={handleChange} />
                                        <input type="text" name="rating" value={editedData.rating} onChange={handleChange} />
                                    </>
                                ) : (
                                    <>
                                        <div className="upper_data d-flex justify-content-between align-items-center">
                                            <h4 className='mt-2'>{element.dish}</h4>
                                            <span>{element.rating}&nbsp;★</span>
                                        </div>
                                        <div className="lower_data d-flex justify-content-between">
                                            <h5>{element.address}</h5>
                                            <span>₹ {element.price}</span>
                                        </div>
                                    </>
                                )}
                                <div className="extra"></div>
                                <div className="last_data d-flex justify-content-between align-items-center">
                                    <img src={element.arrimg} className='limg' alt="" />
                                    {editing === element.id ? (
                                        <Button onClick={() => saveProduct(element.id)} style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light' className='mt-2 mb-2'>Save</Button>
                                    ) : (
                                        <>
                                            <Button onClick={() => send(element)} style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light' className='mt-2 mb-2'>Add to Cart</Button>
                                            <Button onClick={() => editProduct(element)} style={{ width: "50px", background: "#007bff", border: "none" }} variant='outline-light' className='mt-2 mb-2'>✏️</Button>
                                            <Button onClick={() => deleteProduct(element.id)} style={{ width: "50px", background: "#dc3545", border: "none" }} variant='outline-light' className='mt-2 mb-2'>🗑️</Button>
                                        </>
                                    )}
                                    <img src={element.delimg} className='laimg' alt="" />
                                </div>
                            </div>
                        </Card>
                    ))}
                    {show && <AddProduct show={show} handleClose={handleClose} />}
                </div>
            </section>
        </>
    );
};

export default Home;
