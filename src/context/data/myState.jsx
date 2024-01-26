import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const MyState = (props) => {
  const [mode, setMode] = useState("light");
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  ////////////////////////////////addproduct//
  const addProducts = async () => {
    if (
      products.title === null ||
      products.price === null ||
      products.imageUrl === null ||
      products.category === null ||
      products.description === null
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Added product successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };
  const [product, setProduct] = useState([]);
  ////////////////////////////////////////////////////////////////get products////////////////////////////////
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  ///get orders
  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  ////get users
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  // update product functionality
  const editHandle = (product) => {
    setProducts(product);
  };
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product updated successfully", { autoClose: 1000 });
      getProductData();
      setLoading(false);
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const deleteProduct = async (item) => {
    console.log(item);
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully", {
        autoClose: 1000,
      });
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <myContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProducts,
        product,
        editHandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {loading && <Loader />}
      {props.children}
    </myContext.Provider>
  );
};

export default MyState;
