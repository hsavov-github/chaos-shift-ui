import React, { useCallback, useState, useEffect, useContext } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {ProjectContext} from './ProjectModal';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const categories = [
  'History',
  'Cost Assessment',
  'Assignment',
  'Location',
  'Client information',
  'Project information',
  'Project requirements',
  'Service scope',
  'Time schedule',
  'Project budget',
  'Special conditions',
];


export default function AssignmentCategoryPicker() {
 const context = useContext(ProjectContext);
     useEffect(() => {
 	   console.log(context.project);
 },[context.project]);

  return (
    <div >
    <FormControl sx={{ m: 1, minWidth: 450}}>
      <Autocomplete
              multiple
              id="tags-standard"
              onChange={(event, value) => context.setProject({...context.project, categories:value})}
              options={categories}
              defaultValue={context.project.categories}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Assignment breakdown categories"
                />
              )}
            />
    </FormControl>
    </div>
  );
}