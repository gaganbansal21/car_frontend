import React, { useState, useEffect, Component } from 'react';
import './App.css';
import axios from 'axios';
import CardContent from './components/cardContent';
import _ from "lodash";


const colorOptions = ["Any", "Black", "Red", "Blue", "Green"];
const mileageOptions = ["Any", "10000 miles", "20000 miles", "30000 miles"];



function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState({ price: 500000, color: 'Any', mileage: 'Any' });
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false)

  const API_ENDPOINT = 'https://blue-violet-bandicoot-hat.cyclic.app/api/cars';

  const handleSearchBox = () => {
    console.log(showSearch);
    setShowSearch(!showSearch)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    };

    fetchData();
  }, [filter]);

  const fetchSearchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/search/?search=${search}`);
      const data = await response.data;
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchSearchData();
  };

  const resetFilter = () => {
    setSearch('');
    setFilteredUsers(() => users);
    setFilter({ price: 500000, color: 'Any', mileage: 'Any' });
  };

 
    const handlePriceChange = (value) => {
      setFilter({ ...filter, price: value });
    };
 

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

            <button className="reset_btn" onClick={resetFilter}>
              Reset
            </button>
          </div>
          <div onClick={handleSearchBox} className='three-dots-icon'>
            <img src='https://cdn-icons-png.flaticon.com/128/54/54878.png' />
          </div>
        </nav>



        <div className="main-container">
          <div className="filter_container">
            {showSearch &&
              <div className="seach_bx inside-filter">
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

                <button className="reset_btn" onClick={resetFilter}>
                  Reset
                </button>

                
              </div>}
            <div className="filter_options">
              <label htmlFor="price" className="">Price : </label>
              <span> $0 - ${filter.price}</span>
              <br></br>
              <input
                type="range"
                id="price"
                className="filter_price_range"
                // value={filter.minPrice}
                min={500}
                max={500000}
                step={10}
                value={filter.price}
                onChange={(e) => handlePriceChange(e.target.value)}
                // onMouseUp={(e) => handlePriceChange(e.target.value)}
              // onChange={(e) => handlePriceChange([parseInt(e.target.value), filter.maxPrice])}
              />
              <br></br>
            </div>

            <div className="filter_options">
              <label htmlFor="color" className="color_label_filter">Color : </label>
              <select
                id="color"
                className="filter_color_select"
                value={filter.color}
                onChange={(e) => setFilter({ ...filter, color: e.target.value })}
              >
                {colorOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter_options">
              <label htmlFor="mileage" className="mileage_label_filter">Mileage : </label>
              <select
                id="mileage"
                className="filter_mileage_select"
                value={filter.mileage}
                onChange={(e) => setFilter({ ...filter, mileage: e.target.value })}
              >
                {mileageOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button className="reset_btn" onClick={resetFilter}>
                Reset
            </button>

            {/* <button className="p-2 bg-gray text-white mb-4 md:mb-0 md:ml-2" onClick={handleFilter}>
              Filter
            </button> */}
          </div>

          {/* <div className="flexContainer" >
            {filteredUsers.length>0 && filteredUsers.map((user, index) => (
               <div className="flex-wrap card-container">
                  <CardContent user={user} index={index} />
              </div>
            ))}
        </div> */}

          {/* <div className="flex flex-wrap" >
            {filteredUsers.length>0 && filteredUsers.map((user, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
                <CardContent user={user} />
              </div>
            ))}
        </div> */}

          <div className="content-container">
            {filteredUsers.length > 0 && filteredUsers.map((user, index) => (
              <CardContent key={index} user={user} index={index} />
            ))}
            {!filteredUsers.length && <p className="no-results-message text-center">No cars found</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;