import { Avatar } from '@mui/material';

// generate color based on the first character of the name so store list of colors with size 26
const colors = [
  '#FF6633', '#FFB399', '#E38421', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
];

const CustomAvatar = ({ name }) => {
  // Get the first two characters of the name
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const randomColor = () => {
    const index = initials.charCodeAt(0) - 65;
    return colors[index];
  };

  return (
    <Avatar sx={{ width: 24, height: 24, bgcolor: randomColor() }}><span style={{ fontSize: '12px' }} >{initials}</span></Avatar>
  );
};

export default CustomAvatar;