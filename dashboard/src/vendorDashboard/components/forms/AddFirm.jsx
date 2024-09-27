import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const AddFirm = () => {
  const [firmname, setFirmname] = useState("")
  const [area,setArea] = useState("")
  const [category,setCategory] = useState([])
  const [offer,setOffer]=useState("")
  const [region,setRegion]=useState([])
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
  

  const handleRegionChange =(event)=>{
    const value = event.target.value;
   
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !== value))
    }
    else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload =(event)=>{
    
      const selectedImage = event.target.files[0]
      setFile(selectedImage)
    }

  const handleFirmSubmit = async(e)=>{
    e.preventDefault();
    try{
      const loginToken= localStorage.getItem('loginToken')
      if(!loginToken){
        console.error("user not authenticated")
      }
      const formData = new FormData();
      formData.append('firstname',firmname);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      
      
    
      category.forEach((value) =>{
        formData.append('category',value)
      })

      region.forEach((value) =>{
        formData.append('region',value)
      })


      const response = await fetch(`${API_URL}/firm/addFirm`,{
        method:'POST',
        headers:{
          'token' : `${loginToken}`
        },
        body : formData
      })
      const data = await response.json()

      if(response.ok){
        console.log(data);
        alert("firm added successfully")
        setFirmname("");
        setArea("");
        setCategory([]);
        setOffer("");
        setRegion([]);
        setFile(null);
      }
      else if(data.message ==="vendor have only one firm"){
        alert("firm existed only 1 firm can be added")
      }
      else{
        alert("failed to add firm")
      }

      const firmId = data.firmIds
      localStorage.setItem('firmId', firmId)


    }catch(error){
      console.error("failed to add firm")
    }

    
  }

  return (
    <div className='addfirm'>

        <form className="tableform" onSubmit={handleFirmSubmit}>
            <h2>Add Firm</h2>
            <label>Firm Name</label>
            <input type="text" name="firmname" value={firmname} onChange={(e)=>setFirmname(e.target.value)} />
            <label>Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/>
            {/* <label>Category</label>
            <input type="text" /> */}
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
            {/* <label>Region</label>
            <input type="text" /> */}
           
            <label >Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            
            
            <div className="checkInp">
              <label>Region</label>
              <div className="inputsContainer">
              <div className="regionboxContainer">
                <label>South Indian</label>
                <input type="checkbox"value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
              </div>
              <div className="regionboxContainer">
                <label>North Indian</label>
                <input type="checkbox"value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
              </div>
              <div className="regionboxContainer">
                <label>Chinese</label>
                <input type="checkbox"value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/>
              </div>
              <div className="regionboxContainer">
                <label>Bakery</label>
                <input type="checkbox"value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>
              </div>
              </div>
            </div>
            <label>Firm Image</label>
            <input type="file"  onChange={handleImageUpload}/><br/>
        
        <div className='btnsumbit'>
            <button type='submit'>submit</button>
        </div>
        </form>
    </div>
  )
}

export default AddFirm