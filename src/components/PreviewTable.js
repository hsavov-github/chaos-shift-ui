import React, { useCallback, useState } from 'react';
//import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadCard from './UploadCard';
import PreviewCard from './PreviewCard';

function createData(title, status) {
  return {
    title,
    status,
    comments: [
      {
		title:'Some remark',
        date: '2020-01-05',
        status: 'active',
      },
      {
		title:'Another remark',
        date: '2020-01-02',
        status: 'resolved',
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
		{row.file ? <TableCell><PreviewCard file = {row.file}/></TableCell> : <TableCell/>}
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Comment</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.comments.map((commentRow) => (
                    <TableRow key={commentRow.content}>
                      <TableCell component="th" scope="row">
                        {commentRow.title}
                      </TableCell>
                      <TableCell>{commentRow.date}</TableCell>
                      <TableCell>{commentRow.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/*
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
*/
const model = [
  createData('Extend walls', 'Active'),
  createData('Remove  Window', 'Resolved'),
  createData('Replace elevator with a pony service', 'Active')
];
	


export default function PreviewTable() {
  const [rows, setRows] = useState(model);
  
  function addRows(files) {
	const rowsToAdd = files.map(file => {
		var row = createData('Set title', 'Active');
		row.file = file;
		row.file.preview = URL.createObjectURL(file);
		return row;
	});
	setRows(rowsToAdd.concat(rows));
  };
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
		<TableRow>
		    <TableCell/>
			<TableCell/>
            <TableCell> 
				<UploadCard addFiles={addRows}/>
			</TableCell>
			<TableCell/>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell> Preview </TableCell>
			<TableCell> Title</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}