import { Checkbox, TableCell, TableHead, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
function CheckInHeader(props) {
    const { headCells, onSelectAllClick, numSelected, rowCount } = props;


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </TableCell>
                {headCells.map((headCell,index) => (
                    <TableCell 
                    key={index}
                    align="right"
                    >
                        {headCell}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

CheckInHeader.propTypes = {
    headCells: PropTypes.array.isRequired,
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default CheckInHeader;