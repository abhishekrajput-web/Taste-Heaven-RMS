import React, { useState, useEffect } from 'react';
import { AdminSidebar, CategoryForm, Heading } from '../../components'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button, Modal } from 'antd';
const CreateCategory = () => {
  // const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpatedName] = useState("");

  //  handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/category/create-category', { name });

      if (data?.success) {
        // toast.success(`${name} is created`);
        toast.success(data.message);
        getAllCategory();
        setName("");
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form ")
    }
  }

  //  hanlde delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/api/v1/category/delete-category/${id}`);

      if (data?.success) {
        toast.success(`selected category is deleted`);
        getAllCategory();
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting form")
    }
  }

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      const { data } = await axios.put(`http://localhost:3000/api/v1/category/update-category/${selected._id}`, { name: updatedName });

      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpatedName('');
        setVisible(false);
        getAllCategory();
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong in update form")
    }
  }


  //  handle get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting categories");
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (

    <section className='py-5'>
      <div className="container py-5">

      <div className='row g-5 py-3'>
        <div className=" col-lg-6">
          <AdminSidebar />
        </div>

        <div className=' col-lg-6'>
        <Heading heading="category creation"/>
      {/* <h2 className='text-capitalize fs-4'>Category Creation</h2> */}
          <CategoryForm handleSubmit={handleSubmit} inputVal={name} setInputVal={setName} />
          {categories?.map((c, i) => (
            <div className='d-flex flex-row justify-content-between gap-3 py-4' key={i}>
              <h2 className='text-lowercase fs-6 fw-medium'>{c?.name}</h2>
              <div>
                <button className='btn btn-success mx-3' onClick={() => { setVisible(true); setUpatedName(c.name); setSelected(c) }}>edit</button>
                <button className='btn btn-outline-danger' onClick={() => { handleDelete(c._id) }}>delete</button>
              </div>
            </div>
          ))}


          <div>
            <Modal title="Basic Modal" onCancel={() => setVisible(false)} footer={null} open={visible} >
              <CategoryForm inputVal={updatedName} setInputVal={setUpatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>

        </div>
      </div>
      </div>
    </section>
  )
}

export default CreateCategory;
















// adding images in categories

// import React, { useState, useEffect } from 'react';
// import { AdminSidebar, CategoryForm, Heading } from '../../components';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { Button, Modal } from 'antd';

// const CreateCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [categoryPhoto, setCategoryPhoto] = useState(""); // For storing base64 image
//   const [visible, setVisible] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [updatedName, setUpatedName] = useState("");
//   const [updatedPhoto, setUpdatedPhoto] = useState(""); // For updating image

//   // Convert image to base64 for both new and update scenarios
//   const handleImageChange = (e, update = false) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (update) {
//         setUpdatedPhoto(reader.result); // For updating the image
//       } else {
//         setCategoryPhoto(reader.result); // For creating a new category
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle form submit for creating new category
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:3000/api/v1/category/create-category', { 
//         name, 
//         categoryPhoto 
//       });

//       if (data?.success) {
//         toast.success(data.message);
//         getAllCategory();
//         setName("");
//         setCategoryPhoto("");
//       } else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in input form");
//     }
//   };



// //   //  hanlde delete
//   const handleDelete = async (id) => {
//     try {
//       const { data } = await axios.delete(`http://localhost:3000/api/v1/category/delete-category/${id}`);

//       if (data?.success) {
//         toast.success(`selected category is deleted`);
//         getAllCategory();
//       }
//       else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong in deleting form")
//     }
//   }



//   // Handle update category with or without updating the image
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(`http://localhost:3000/api/v1/category/update-category/${selected._id}`, {
//         name: updatedName,
//         categoryPhoto: updatedPhoto || selected.categoryPhoto // Use updatedPhoto if available, else fallback to original
//       });

//       if (data?.success) {
//         toast.success(`${updatedName} is updated`);
//         setSelected(null);
//         setUpatedName('');
//         setUpdatedPhoto(''); // Clear updatedPhoto state after update
//         setVisible(false);
//         getAllCategory();
//       } else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in update form");
//     }
//   };

//   // Handle get category
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Something went wrong in getting categories");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   return (
//     <section className='py-5'>
//       <div className="container py-5">
//         <div className='row g-5 py-3'>
//           <div className="col-lg-6">
//             <AdminSidebar />
//           </div>
//           <div className='col-lg-6'>
//             <Heading heading="Category Creation" />
//             <CategoryForm handleSubmit={handleSubmit} inputVal={name} setInputVal={setName} />
//             <input type="file" accept="image/*" onChange={handleImageChange} />
            
//             {categories?.map((c, i) => (
//               <div className='d-flex flex-row justify-content-between align-items-center gap-3 py-4' key={i}>
//                 <h2 className='text-lowercase fs-6 fw-medium'>{c?.name}</h2>
//                 <img src={c?.categoryPhoto} alt={c?.name} className='w-25 img-fluid' />
//                 <div> 
//                   <button className='btn btn-success mx-3' onClick={() => { setVisible(true); setUpatedName(c.name); setSelected(c); setUpdatedPhoto(""); }}>edit</button>
//                   <button className='btn btn-outline-danger' onClick={() => { handleDelete(c._id) }}>delete</button>
//                 </div>
//               </div>
//             ))}

//             <div>
//               <Modal title="Edit Category" onCancel={() => setVisible(false)} footer={null} open={visible}>
//                 <CategoryForm inputVal={updatedName} setInputVal={setUpatedName} handleSubmit={handleUpdate} />
//                 <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
//               </Modal>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CreateCategory;






















