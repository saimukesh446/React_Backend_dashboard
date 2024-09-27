import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsHandler();
  }, []);

  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newproductData = await response.json();
      setProducts(newproductData.products);
    } catch (error) {
      console.error("failed to fetch product", error);
    }
  };

  const deleteProductById = async (productId) => {
    console.log(productId);
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });

      console.log(response)

      if(response.ok){
          setProducts(products.filter(product=>product._id !== productId));
          alert("product deleted successfully")
      }
      
    } 
    
    catch (error) {
      console.error("failed ", error);
      alert("failed ");
    }
  };

  return (
    <div>
      {!products ? (
        <p>No product found</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>product Name</th>
              <th>price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td> {item.productname}</td>
                    <td>{item.price}</td>

                    <td>
                      {item.image && (
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          alt={item.productname}
                          style={{ width: "50px", height: "5opx" }}
                        />
                      )}
                    </td>

                    <td>
                      <button onClick={() => deleteProductById(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
