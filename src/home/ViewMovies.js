import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ManageMovies from './ManageMovies';

function Contect() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
    }, []);

    const handleMovieUpdate = (updatedMovie) => {
        setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
    };

    return (
        <div>
            {movies.length === 0 ? (
                <div className="container mt-5">
                    <div className="alert alert-info text-center" role="alert" style={{ borderRadius: 0 }}>
                        <h2 className="display-4">No movies are running currently</h2>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {movies.map(movie => (
                        <div key={movie.id} className="col-md-4 mb-4">
                            <div className="card h-100" style={{ width: '18rem' }}>
                                <img className="card-img-top" src={`${movie.filePath}`} alt={movie.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.name}</h5>
                                    <p className="card-text">{movie.description}</p>
                                    <a href="#" className="btn btn-primary" onClick={() => {
                                        setSelectedMovie(movie);
                                        setShowModal(true);
                                    }}>Edit Movie</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}
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