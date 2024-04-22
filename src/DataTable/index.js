import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { useContext, useState } from 'react';
import { defaultValues } from '../constant';
import { valueContext } from '../ValueContext';

const copyText = async (value) => {
    await navigator.clipboard.writeText(value);
}

const getColVals = (value, base) => {
    const isValueDefault = defaultValues.includes(value)
    return ({ "pixel-size": value, ratio: Math.floor(value / base * 10000) / 10000, "action-copy": true, "action-delete": !isValueDefault })
}

const getIconButton = (type, state, action) => {
    const valueSet = { title: type, icon: type === 'Delete' ? <DeleteIcon fontSize="inherit" /> : <ContentCopyRoundedIcon fontSize="inherit" /> }
    if (type !== 'Delete') {
        switch (state) {
            case true: valueSet.title = "Copied!"; valueSet.icon = <DoneOutlinedIcon fontSize="inherit" />; break;
            case false: valueSet.title = "Failed"; valueSet.icon = <ClearOutlinedIcon fontSize="inherit" />; break;
            default:
        }
    }
    return <Tooltip title={valueSet.title} placement="right">
        <IconButton size="small" onClick={action}>
            {valueSet.icon}
        </IconButton>
    </Tooltip>
}

const DataTable = ({ baseSize }) => {
    const { values, removeValue } = useContext(valueContext)
    const [iconStates, setIconStates] = useState({})

    const updateStateIcons = (targetValue, isSuccess) => {
        setIconStates(prev => ({ ...prev, [`value_${targetValue}`]: isSuccess }))
        setTimeout(() => {
            setIconStates(prev => ({ ...prev, [`value_${targetValue}`]: undefined }))
        }, 2000)
    }

    const columns = [{ id: 'pixel-size', label: 'Size (px)', align: 'right', minWidth: 50 },
    { id: 'ratio', label: 'Ratio (rem / em)', align: 'right', minWidth: 50 },
    {
        id: 'action-copy',
        label: 'Copy',
        width: 28,
        align: 'right',
        type: 'action',
        action: (value, remValue) => { copyText(remValue).then(res => updateStateIcons(value, true)).catch(e => updateStateIcons(value, false)) }
    }, {
        id: 'action-delete',
        label: 'Delete',
        minWidth: 50,
        align: 'right',
        type: 'action',
        action: (value) => { removeValue(value) }

    }]

    return <TableContainer>
        <Table stickyHeader aria-label="Ratio List" size="small">
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth || 0, width: column.width ? column.width : 'auto' }}
                        >
                            {column.type === "action" ? "" : column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {values
                    .map((value, idx) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={`row_${idx}`}>
                                {columns.map((column) => {
                                    const colValues = getColVals(value, baseSize)
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.type === 'action' ? (colValues[column.id] &&
                                                getIconButton(column.label, iconStates[`value_${value}`], () => { column.action(value, colValues.ratio) })) : colValues[column.id]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>
    </TableContainer>
}

export default DataTable