import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ManageMovies from './ManageMovies';
import { useNavigate } from 'react-router-dom';


function Contect() {
    const navigate = useNavigate();

    const [auth, setAuth] = React.useState(!!localStorage.getItem('token'));
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:3001/movies/get');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/category');
            setCategories(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };

    const handleMovieUpdate = (updatedMovie) => {
        setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
    };

    const filteredMovies = selectedCategory
        ? movies.filter(movie => movie.category == selectedCategory)
        : movies;

    return (
        <div>
            {movies.length === 0 ? (
                <div className="container mt-5">
                    <div className="alert alert-info text-center" role="alert" style={{ borderRadius: 0 }}>
                        <h2 className="display-4">No movies are running currently</h2>
                    </div>
                </div>
            ) : (<div className="container-fluid py-4">
                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            {filteredMovies.map(movie => (
                                <div key={movie.id} className="col-md-4 mb-4">
                                    <div className="card h-100" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src={`${movie.filePath}`} alt={movie.title}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.name}</h5>
                                            <p className="card-text">{movie.description}</p>
                                            {auth ? (
                                                <a href="#" className="btn btn-primary" onClick={() => {
                                                    setSelectedMovie(movie);
                                                    setShowModal(true);
                                                }}>Edit Movie</a>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => navigate('/buyticket')}>Buy Ticket</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h3>Filter by Category</h3>
                        <ul className="list-group">
                            <li
                                className={`list-group-item ${selectedCategory === null ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(null)}
                                style={{
                                    backgroundColor: selectedCategory === null ? 'black' : 'white',
                                    color: selectedCategory === null ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                            >
                                All Categories
                            </li>
                            {categories.map(category => (
                                <li
                                    key={category.id}
                                    className={`list-group-item ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                    style={{
                                        backgroundColor: selectedCategory === category.id ? 'black' : 'white',
                                        color: selectedCategory === category.id ? 'white' : 'black',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>)}
            <div className="col-md-3">
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ManageMovies movie={selectedMovie} onClose={() => setShowModal(false)} onUpdate={handleMovieUpdate} />
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default Contect