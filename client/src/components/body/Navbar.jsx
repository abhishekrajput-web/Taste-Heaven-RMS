import React from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SearchInput from "../SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const categories = useCategory();
  console.log(categories);
  const { cart } = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-xl">
        <Link
          className="navbar-brand text-capitalize bg-success px-3 text-white fw-bold"
          to="/"
        >
          Taste Heaven
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item ">
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>{" "}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    {auth?.user?.name}
                  </Link>
                </li>

                {/* {auth?.user && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`/reservation`}
                    >
                      Reserve Table
                    </Link>
                  </li>
                )} */}

                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLogout}>
                    {" "}
                    Logout
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/user/profile">
                    {" "}
                    Profile
                  </Link>
                </li>
                {/* 
                    <li className='nav-item'>
                      <Link className="nav-link" to="/dashboard/user/orders" > Orders</Link>
                    </li>
  */}
              </>
            )}

            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <Link to="/cart" className="nav-link my-1">
                  Cart
                </Link>
              </Badge>
            </li>

            <SearchInput />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
