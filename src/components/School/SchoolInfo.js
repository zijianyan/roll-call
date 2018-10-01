import React from 'react';

const SchoolInfo = ({ school })=> {
  return (
    <div>
      <h2>{school.name}</h2>
      <div id='school-image-container'>
        <img src={school.imageUrl} id='school-image'/>
      </div>
      <h3>Address</h3>
      <p>{school.address}</p>
      { school.description ? (<div><h3>Description</h3><p>{school.description}</p></div>) : null }
    </div>
  );
};

export default SchoolInfo;