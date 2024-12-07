import React, { useState, useEffect } from "react";
import { AdminSidebar, Heading } from "../../components";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/fetchBaseUrl";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // get single product

  const getSingleProdcut = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/single-product/${slug}`
      );
      setId(data.singleProduct._id);
      console.log(data);
      console.log(data.singleProduct._id);
      setName(data.singleProduct.name);
      setDescription(data.singleProduct.description);
      setPrice(data.singleProduct.price);
      // setQuantity(data.singleProduct.quantity);
      setCategory(data.singleProduct.category._id);
      // setBeforePhoto(data.singleProduct.photo.url);
      // setPhoto(data?.singleProduct?.photo);
      setPhoto(data.singleProduct.photo.url);
      console.log(data.singleProduct.category._id);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("something went wong in getting single product");
    }
  };

  useEffect(() => {
    getSingleProdcut();
  }, []);

  // get all category

  //  handle get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/category/get-category`
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

  //handle update uplaod image

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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name,
        description,
        price,
        category,
        photo,
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/product/update-product/${id}`,
        updatedData
      );
      if (data?.success) {
        toast.success("product updated successfully");
        navigate("/dashboard/admin/products");
        console.log(data);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // handleDelete
  const handleDelete = async () => {
    // e.preventDefault();
    try {
      let answer = window.prompt(
        "are you sure you want to delete this product ?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(`selected product is deleted`);
        navigate("/dashboard/admin/products");
        console.log(data);
        // getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting product");
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
            <Heading heading="update product" />
            {/* <h2 className='fs-4 text-capitalize'> Update Product</h2> */}
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
                    alt=""
                    height="200px"
                    className="img-fluid adjust"
                  />
                ) : (
                  <p className="display-1">image product will appear here</p>
                )}
              </div>

              <div className="py-3">
                <form autoFocus={true} className="d-flex flex-column gap-3">
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

                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleUpdate}
                  >
                    Update product
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete product
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

export default UpdateProduct;
