import React, { useState, useEffect, Component } from 'react';
import './App.css';
import axios from 'axios';
import CardContent from './components/cardContent';
import _ from "lodash";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


// const colorOptions = ["Any", "Black", "Red", "Blue", "Green"];
// const mileageOptions = ["Any", "10000 miles", "20000 miles", "30000 miles"];

function App() {


  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState({ price: [10000, 300000], color: [], mileage: [1, 60] });
  // console.log("fi", filter);
  const [color, setColor] = useState({
    Red: false,
    Green: false,
    Yellow: false,
    Blue: false,
    Silver: false,
    Any: true
  })
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false)
  const [priceRange, setPriceRange] = useState([10000, 300000]);
  const [mileageRange, setmileageRange] = useState([1, 60]);
  const [searchPerformed, setSearchPerformed] = useState(true);
  // const [initialRender, setInitialRender] = useState(false);
  // const [mileageRange, setmileageRange] = useState([1, 60]);
  const [initialMileageRange, setInitialMileageRange] = useState([1, 60]);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    setInitialMileageRange([1, 60]);
  }, []);


  const first = true;

  const formatNumber = (num) => {
    try {
      let amount = Number(num);
      if (!amount || amount === 0) return "0";

      const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };

      const roundedAmount = amount.toLocaleString("en-IN", options);
      return roundedAmount;

    } catch (err) {
      return "-";
    }
  }

  const API_ENDPOINT = 'https://blue-violet-bandicoot-hat.cyclic.app/api/cars';
  // const API_ENDPOINT = 'http://localhost:5000/api/cars';

  const handleSearchBox = () => {
    console.log(showSearch);
    setShowSearch(!showSearch)
  }

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      setLoading(true)
      const { price, color, mileage } = filter;
      const response = await axios.get(API_ENDPOINT, {
        params: {
          price,
          color,
          mileage
        },
      });

      const data = await response.data;
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally{
      setLoading(false);
    }
  };



  // useEffect(() => {
  //   fetchData();
  // }, [filter])

  const fetchSearchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_ENDPOINT}/search/?search=${search}`);
      const data = await response.data;
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally{
      setLoading(false)
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchSearchData();
  };

  const resetFilter = async () => {
    setSearch('');
    setFilteredUsers(() => users);
    setColor({
      Red: false,
      Green: false,
      Yellow: false,
      Blue: false,
      Silver: false,
      Any: true
    })
    setFilter({ ...filter, price: [10000, 300000], color: [], mileage: [1, 60] });
    setPriceRange([10000, 300000]);
    setmileageRange([1, 60]);
    setmileageRange(initialMileageRange);
    fetchData()
  };


  useEffect(() => {
    const timerid = setTimeout(() => {  //debounce except on first load
      fetchData();
    }, 500);

    return () => clearTimeout(timerid);
  }, [filter]);

  const handleColorToggle = (selectedColor) => {

    // console.log("selectedColor", selectedColor)
    if (selectedColor === "Any") {
      setColor({
        Red: false,
        Green: false,
        Yellow: false,
        Blue: false,
        Silver: false,
        Any: true
      })
      return;
    }

    setColor((color) => {
      const updatedColors = { ...color, [selectedColor]: !color[selectedColor] };
      // console.log("updated",updatedColors);
      return updatedColors;
    });

  };

  const handleMileageChange = (_, newValue) => {
    setmileageRange(newValue);
    // console.log(newValue);
    setFilter((filter) => ({
      ...filter,
      mileage: newValue,
    }));
  };


  const handlePriceChange = (_, newval) => {
    setPriceRange(newval);
    // console.log(newValue);
    setFilter((filter) => ({
      ...filter,
      price: newval,
    }));
  };


  useEffect(() => {
    const selectedColors = Object.keys(color).filter((key) => color[key]);
    // console.log("1 s5", color);
    // console.log("len", selectedColors.length);
    // console.log("len", color.Any);
    // Check if 'Any' is selected
    if (color.Any === true && selectedColors.includes('Any') && selectedColors.length > 1) {
      color.Any = false;
      // console.log("color", color);
    }

    setFilter((filter) => ({ ...filter, color: selectedColors }));
    // console.log("filter", filter)
  }, [color]);

 
  
  

  return (
    <>
      <div className="container">
        <nav>
          <p className="app_logo_name">BUYC Corp.</p>
          <div className="seach_box">
            <input
              type='text'
              placeholder='search..'
              value={search}  // Explicitly set the value from the state
              onChange={e => setSearch(e.target.value)}
              className="serach_box_input"
            />
            <button className="serach_box_btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div onClick={handleSearchBox} className='three-dots-icon'>
            <img src='https://cdn-icons-png.flaticon.com/128/54/54878.png' />
          </div>
        </nav>

        <div className="main-container">
          <div className='position_container'>
            <div className="filter_container">
              {showSearch &&
                <div style={showSearch && { display: "block !important" }} className="seach_bx inside-filter-search">
                  <input
                    type='text'
                    placeholder='search..'
                    value={search}  // Explicitly set the value from the state
                    onChange={e => setSearch(e.target.value)}
                    className="serach_box_input"
                  />
                  <button className="serach_box_btn" onClick={handleSearch}>
                    Search
                  </button>

                </div>

              }

              <div className="filter_options">

                <label htmlFor="price" className="mileage_label_filter">Price : </label>
                <Box sx={{ width: '70%', justifyContent: 'center' }}>
                  <Slider
                    value={filter.price}
                    getAriaLabel={() => 'Amount'}
                    min={10000}
                    max={300000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    onChange={handlePriceChange}
                  />
                  <span>Min :  ${formatNumber(priceRange[0])}</span>
                  <br></br>
                  <span>Max :  ${formatNumber(priceRange[1])}</span>
                </Box>
              </div>

              <div className="filter_options">
                <label htmlFor="color" className="color_label_filter">
                  Color :
                </label>
                {Object.keys(color).map((key) => (
                  <div className='check_box_filter_color' key={key}>
                    <input
                      type="checkbox"
                      id={key}
                      checked={color[key]}
                      onChange={() => handleColorToggle(key)}
                    />
                    <label htmlFor={key}>{key}</label>
                  </div>
                ))}
              </div>

              <div className="filter_options">
                <label htmlFor="mileage" className="mileage_label_filter">
                  Mileage (in MPG):
                </label>
                <Box sx={{ width: '70%', justifyContent: 'center' }}>
                  <Slider
                    // track={true}
                    // defaultValue={[mileageRange[0], mileageRange[1]]}
                    value={filter.mileage}
                    min={1}
                    max={60}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    onChange={handleMileageChange}
                  />
                  <span>Min: {mileageRange[0]}</span>
                  <br />
                  <span>Max: {mileageRange[1]}</span>
                </Box>
              </div>

              <button className="reset_btn" onClick={resetFilter}>
                Reset
              </button>
            </div>
          </div>

          <div className="content-container">
            {filteredUsers.length > 0? filteredUsers.map((user, index) => (
              <CardContent key={index} user={user} index={index} />
            )):<p>{loading&&filteredUsers.length===0?"Loading":"No Cars Found"}</p>}
           
          </div>
        </div>
      </div>
    </>
  );
}

export default App;