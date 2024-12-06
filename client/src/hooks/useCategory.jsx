import React, {useState, useEffect} from 'react'
import axios from "axios";
const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try{
          const {data} = await axios.get("http://localhost:3000/api/v1/category/get-category");
            setCategories(data?.category);
        }
        catch(err){
          console.log(err);            
        }
      }
    
      useEffect(() => {
        getAllCategory();
      },[]);
    
  return categories;
  
}

export default useCategory;