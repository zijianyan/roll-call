import React from 'react';

import { Typography } from '@material-ui/core';

const SchoolInfo = ({ school })=> {
  return (
    <div>
      <Typography variant='display1'>{school.name}</Typography>
      <div id='school-image-container'>
        <img src={school.imageUrl} id='school-image'/>
      </div>
      <Typography variant='title'>Address</Typography>
      <Typography variant='body1'>{school.address}</Typography>
      {
        school.description ? (
          <div>
            <Typography variant='title'>
              Description
            </Typography>
            <Typography variant='body1'>
              {school.description}
            </Typography>
          </div>
        ) : null
      }
    </div>
  );
};

export default SchoolInfo;