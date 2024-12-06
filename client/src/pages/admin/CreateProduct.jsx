import React, { useState, useEffect } from "react";
import { AdminSidebar, Heading } from "../../components";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  console.log(photo);
  // get all category

  //  handle get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //handle image uplaod

  const handleProductImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    transformImage(file);
  };

  // transform images

  const transformImage = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
    } else {
      setPhoto("");
      console.log("no file is upload");
    }
  };

  // handle create
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const createData = {
        // name, description, price, quantity, category, photo
        name,
        description,
        price,
        category,
        photo,
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/create-product",
        createData
      );
      console.log(data);
      if (data?.success) {
        toast.success("product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row g-5 py-3">
          <div className="col-md-6 col-lg-6">
            <AdminSidebar />
          </div>

          <div className="col-md-6 col-lg-6">
            <Heading heading="product creation" />
            {/* <h2 className='fs-4 text-capitalize'> Product Creation</h2> */}
            <div>
              <div>
                <Select
                  bordered={false}
                  placeholder="please select a category"
                  size="large"
                  showSearch
                  className="bg-light border w-100 text-capitalize fs-4 p-0"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c, i) => (
                    <Option key={i} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div class="py-3">
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  accept="image/"
                  onChange={handleProductImage}
                  required="required"
                />
              </div>

              <div className="w-auto">
                {photo ? (
                  <img
                    src={photo}
                    alt="product image"
                    height="200px"
                    className="img-fluid adjust"
                  />
                ) : (
                  <p>image product will appear here</p>
                )}
              </div>

              <div className="py-3">
                <form
                  autoFocus={true}
                  onSubmit={handleCreate}
                  className="d-flex flex-column gap-3"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="write a name"
                    required="required"
                    className="form-control"
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="write product description"
                    required="required"
                    className="form-control"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="set product price"
                    required="required"
                    className="form-control"
                  />

                  <button className="btn btn-primary" type="submit">
                    create product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
