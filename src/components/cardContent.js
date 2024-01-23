import React from 'react';
import './cardContent.css';

const imageUrl = "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


const CardContent = ({ user, index }) => {
  return (
    <div class="card">
      <div className='img-wrapper'>
           <img src={user.CarImage} alt="Card Image" class="card-image" />
      </div>

      <div class="card-content">
        <h2 class="card-title">{user.CarMake} {user.CarModel}</h2>
        <p class="card-text">Manufacturing Year : {user.CarYear}</p>
        <p class="card-text">CarColor : {user.CarColor}</p>
        <p class="card-text">CarPrice : ${user.CarPrice} </p>
        <p class="card-text">CarMilage : {user.CarMileage}</p>
      </div>
    </div>

  );
};

export default CardContent;




  // <div className="bg-white  rounded-lg shadow-md" style={{ marginBottom: "10px", paddingBottom: "8px" }}>
    //             <img src={user.CarImage} alt={`Car ${index + 1}`} className="mb-3 w-full h-48 object-cover rounded" />
    //             <h2 className="text-xl text-center font-bold mb-2">{user.CarMake}</h2>
    //             <p className="text-gray-700 text-center">CarModel : {user.CarModel}</p>
    //             <p className="text-gray-700 text-center">Manufacturing Year : {user.CarYear}</p>
    //             <p className="text-gray-700 text-center">CarColor : {user.CarColor}</p>
    //             <p className="text-gray-700 text-center">CarPrice : {user.CarPrice}</p>
    //             <p className="text-gray-700 text-center">CarMilage : {user.CarMileage}</p>
    //     </div>
