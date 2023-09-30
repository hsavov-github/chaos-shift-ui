import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

/*
Project Name: Shanghai Single-family house 
Description: Single-family house in Shanghai, 2 floors
Floor Area: 200m2 
Total GFA: 400m2
Functions: 1floor: entrance, bathroom, kitchen (north); living room, dining room (south); guest-room with a private bathroom (east)
 2 floor: 3 bedrooms,2 bathrooms (north), storage (north)
 Style specifications: modern architectural style, options with flat and pitch roof; natural materials: stone, wood  
*/

const dummyProps = [
			  {
				label:'Project Name:',
				description: 'Shanghai Single-family house',
				id:'1'
			  },
			  {
				label:'Description:',
				description: 'Single-family house in Shanghai, 2 floors',
				id:'2'				
			  },
			  {
				label:'Floor Area:',
				description: '200m2 ',
				id:'3'			
			  },
			  {
				label:'Total GFA:',
				description: '400m2',
				id:'4',	
			  },
			  {
				label:'Project Name:',
				description: 'Shanghai Single-family house ',
				id:'5'		
			  },
			]

export default function ProjectAssignment() {	
	
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {dummyProps.map((prop) => {
        const labelId = `checkbox-list-label-${prop.id}`;

        return (
          <ListItem
            key={prop.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(prop.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(prop.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
               <TextField
				  fullWidth 
				  disabled
				  id="labelId"
				  label={prop.label}
				  variant="standard"
				  defaultValue={prop.description}
				/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}