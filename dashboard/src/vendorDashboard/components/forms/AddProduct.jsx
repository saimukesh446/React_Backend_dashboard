import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const AddProduct = () => {

  const [productname, setProductname] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState([])
  const [best,setBest]=useState("")
  const [description, setDescription]=useState("")
  const [file,setFile]=useState(null)

  const handleCategoryChange =(event)=>{
    const value = event.target.value;
    console.log(category.includes(value))
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !== value))
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller =(event)=>{
    const value = event.target.value ==='true'
    setBest(value)
    
  }

  const handleImageUpload =(event)=>{
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }

  const handleProductSubmit = async(e)=>{
    e.preventDefault();
    try{
      const loginToken= localStorage.getItem('loginToken')
      const firmId= localStorage.getItem('firmId')
      if(!loginToken || !firmId){
        console.error("User not authenticated")
      }
      const formData = new FormData();
      formData.append('productname',productname);
      formData.append('price',price);
      formData.append('image',file);
      formData.append('description',description);
      formData.append('bestSeller',best)
      
    
      category.forEach((value) =>{
        formData.append('category',value)
      })


      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body : formData
      })
      const data = await response.json()

      if(response.ok){
        console.log(data);
        alert("product added successfully")
        setProductname("");
        setPrice("");
        setCategory([]);
        setDescription("");
        setBest([]);
        setFile(null);
      }


    }catch(error){
      console.log(error)
      console.error("failed to add product")
    }
  }


  return (
    <div className='productSection'>
        <form className="tableform" onSubmit={handleProductSubmit}>
            <h2>Add Product</h2>
            <label>product Name</label>
            <input type="text"  name='productname' value={productname} onChange={(e)=>setProductname(e.target.value)}/>
            <label>Price</label>
            <input type="text"  name='price' value={price} onChange={(e)=>setPrice(e.target.value)}/>

            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Non-veg</label>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
              </div>
              </div>
            </div>

            <div className="checkInp">
              <label>Best seller</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Yes</label>
                <input type="radio" value="true" checked={best === true}  onChange={handleBestSeller}/>
              </div>
              <div className="checkboxContainer">
                <label>No</label>
                <input type="radio" value="false" checked={best === false}  onChange={handleBestSeller}/>
              </div>
              </div>
            </div>

            {/* <label>BestSeller</label>
            <input type="text"  name='best'  value={best} onChange={(e)=>setBest(e.target.value)}/> */}

            <label>Description</label>
            <input type="text" name='description'  value={description} onChange={(e)=>setDescription(e.target.value)}/>

            <label>Firm Image</label>
            <input type="file" onChange={handleImageUpload}/><br/>
        
        <div className='btnsumbit'>
            <button type='submit'>submit</button>
        </div>
        </form>
    </div>
  )
}

export default AddProduct