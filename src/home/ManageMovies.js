import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './All.css';
import { useNavigate } from 'react-router-dom';


function ViewMovies({ movie, onClose, onUpdate }) {
  const navigate = useNavigate();

  const [id, setId] = useState(movie ? parseInt(movie.id, 10) : '');
  const [name, setName] = useState(movie ? movie.name : '');
  const [duration, setDuration] = useState(movie ? movie.duration : '');
  const [description, setDescription] = useState(movie ? movie.description : '');
  const [unitPrice, setUnitPrice] = useState(movie ? movie.unitPrice : '');
  const [tickets, setTickets] = useState(movie ? movie.tickets : '');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);



  useEffect(() => {
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('name', name);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('unitPrice', unitPrice);
    formData.append('tickets', tickets);
    formData.append('file', file);
    formData.append('category', category);
    try {
      const response = await axios.post('http://localhost:3001/movies/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Movie added successfully:', response.data);
      setName('');
      setDuration('');
      setDescription('');
      setUnitPrice('');
      setTickets('');
      setFile(null);
      setCategory('');

      // Optionally, you can also reset the file input
      document.getElementById('formFileSm').value = '';
      navigate('/viewMovies');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <>
      <div className="manage-movies-container">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div class="form-group mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail3" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">Duration</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputPassword3" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div class="form-group mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Unit Price</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" id="inputEmail3" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Tickets</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" id="inputEmail3" value={tickets} onChange={(e) => setTickets(e.target.value)} />
              </div>
            </div>
            <div class="form-group mb-3">
              <label htmlFor="formFileSm" class="form-label">Upload a file</label>
              <input
                class="form-control form-control-sm"
                id="formFileSm"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="formFileSm" className="form-label">Select Category</label>
              <select className="form-control form-control-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
                
    </>
  )
}
export default ViewMovies;