import React from 'react';
import { useNavigation } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Avatar, Box } from '@material-ui/core';

const favicon = '/favicon.png';

// TODO pull these from material-ui's button size styles
const useStyles = makeStyles((theme) => ({
  favicon: {
    height: '32px',
  },
  small: {
    height: '30px',
  },
  medium: {
    height: '36px',
  },
  large: {
    height: '42px',
  },
}));

export default function ZumeLogo(props) {
  const classes = useStyles();
  const navigation = useNavigation();
  let src = '';
  let label = '';
  if (props.size === 'favicon') {
    src = favicon;
  } else {
    src = favicon;
  }

  if (props.size === 'large') {
    label = 'Church Digital Transformation';
  }

  if (navigation && navigation.basename) {
    src = `${navigation.basename}${src}`;
  }
  return (
    <Box display="flex">
      <Avatar
        src={src}
        style={{
          height: '50px',
          width: '50px',
          verticalAlign: 'middle',
          marginRight: '20px',
        }}
      >
        <img
          src={src}
          alt="CDX logo"
          className={classes[props.size || 'medium']}
        />
      </Avatar>
      <Typography variant="h2">{label}</Typography>
    </Box>
  );
}
