import React, { useState, useEffect, Component } from 'react';
import './App.css';
import axios from 'axios';
import CardContent from './components/cardContent';


const priceOptions = ["Any", "10000", "20000", "30000"];
const colorOptions = ["Any", "Black", "Red", "Blue", "Green"];
const mileageOptions = ["Any", "10000 miles", "20000 miles", "30000 miles"];

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState({ price: 'Any', color: 'Any', mileage: 'Any' });
  const [search, setSearch] = useState('');

  // Assume this is the API endpoint for fetching car data
  const API_ENDPOINT = 'http://localhost:5000/api/cars';

  useEffect(() => {
    // Fetch car data from the API when the component mounts
    const fetchData = async () => {
      try {
        console.log("Filter: 3", filter);
        const { price, color, mileage } = filter;
        const response = await axios.get(`http://localhost:5000/api/cars`, {
          params: {
            price,
            color,
            mileage,
          },
        })

        const data = await response.data;
        setUsers(data);
        setFilteredUsers(data); // Initialize filteredUsers with all users
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log("Filter:", filter);
    fetchData();
  }, [filter]);

  const fetchSearchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars/search/?search=${search}`);
      console.log("Response:", response);
      const data = await response.data;
      console.log("Data:", data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // setSearch(e.target.value);
    console.log("Search:", search);
    await fetchSearchData();
    setUsers(users);// Wait for the fetchSearchData to complete
    console.log("Filtered Users:", filteredUsers);
  };


  // const handleFilter = () => {
  //   const filteredData = users.filter(user => {
  //     const trimmedFilterPrice = filter.price.trim(); // Trim whitespace
  //     const trimmedUserCarPrice = user.CarPrice.trim(); // Trim whitespace

  //     const priceMatch = trimmedFilterPrice === "Any" || parseInt(trimmedFilterPrice) === parseInt(trimmedUserCarPrice);
  //     const colorMatch = filter.color === "Any" || user.CarColor.toLowerCase() === filter.color.toLowerCase();
  //     const mileageMatch = filter.mileage === "Any" || parseInt(user.CarMileage) === parseInt(filter.mileage);

  //     return priceMatch && colorMatch && mileageMatch;
  //   });
  //   console.log("Filtered Data:", filteredData);
  //   setFilteredUsers(filteredData);
  // };

  const resetFilter = () => {
    setSearch(''); // Set search to an empty string

    // Use the callback function in setFilteredUsers to ensure that it runs after setSearch
    setFilteredUsers(() => {
      return users;
    });

    setFilter({ price: 'Any', color: 'Any', mileage: 'Any' }); // Reset filter options if any
  };

  return (
    <>
      <div className="container ">
        <h1 className="text-center text-4xl font-bold my-8">Car Inventory</h1>


        <div className="flex flex-wrap justify-center items-center mb-4">
          <div className="flex items-center mb-4 p-1">
            <label htmlFor="price" className="mr-2">Price:</label>
            <select
              id="price"
              className="p-2 border border-gray-300 rounded"
              value={filter.price}
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            >
              {priceOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center mb-4 p-1">
            <label htmlFor="color" className="mr-2">Color:</label>
            <select
              id="color"
              className="p-2 border border-gray-300 rounded"
              value={filter.color}
              onChange={(e) => setFilter({ ...filter, color: e.target.value })}
            >
              {colorOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center mb-4 p-1">
            <label htmlFor="mileage" className="mr-2">Mileage:</label>
            <select
              id="mileage"
              className="p-2 border border-gray-300 rounded"
              value={filter.mileage}
              onChange={(e) => setFilter({ ...filter, mileage: e.target.value })}
            >
              {mileageOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* <button className="p-2 bg-gray text-white mb-4 md:mb-0 md:ml-2" onClick={handleFilter}>
              Filter
            </button> */}
        </div>

        <div className="flex items-center justify-center p-6">
          <input
            type='text'
            placeholder='search..'
            value={search}  // Explicitly set the value from the state
            onChange={e => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button className="p-2 bg-blue text-white ml-2 hover:scale-95 " onClick={handleSearch}>
            Search
          </button>

          <button className="p-2 bg-red text-white ml-2 hover:scale-95 " onClick={resetFilter}>
            Reset
          </button>
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

        <div className="containerCard">
          {filteredUsers.length > 0 && filteredUsers.map((user, index) => (
            <div key={index} className='divContainer'>
              <CardContent user={user} index={index} />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mb-4">
          {!filteredUsers.length && <p className="text-center">No cars found</p>}
        </div>
      </div>
    </>
  );
}

export default App;