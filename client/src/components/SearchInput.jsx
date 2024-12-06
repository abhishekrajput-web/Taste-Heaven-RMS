

import React from 'react';
import { useSearch } from '../context/search';
import {useNavigate} from "react-router-dom";
import axios from "axios";
const SearchInput = () => {
    const navigate = useNavigate();
    const {values, setValues} = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`http://localhost:3000/api/v1/product/search/${values.keyword}`);
            setValues({...values, results: data});
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <form className="d-flex mx-4" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({...values, keyword:e.target.value})}  />
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

    
  )
}

export default SearchInput;

{/* <form className="d-flex" role="search">
<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
<button className="btn btn-outline-success" type="submit">Search</button>
</form> */}