import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import styles from "./ActionBar.module.scss"
import { useContext, useEffect, useState } from 'react';
import AddModal from '../AddModal';
import { valueContext } from '../ValueContext';
import { STORAGE_NAME } from '../constant';

const SaveCheckbox = () => {
    const { addedValues } = useContext(valueContext)
    const [isChecked, setChecked] = useState(!!localStorage.getItem(STORAGE_NAME))

    const changeHandler = (e) => { setChecked(e.target.checked) }

    useEffect(() => {
        const copiedValues = [...addedValues.current]
        const doSave = isChecked

        return () => {
            if (doSave) { localStorage.setItem(STORAGE_NAME, JSON.stringify(copiedValues)) } else {
                localStorage.removeItem(STORAGE_NAME)
            }
        }
    }, [])

    return <Checkbox inputProps={{ 'aria-label': 'Save new to localStorage' }} checked={isChecked} size="small" onChange={changeHandler} />
}

const AddBtn = () => {
    const [isOpen, setOpen] = useState(false);

    return <><Button variant="contained" onClick={() => setOpen(true)}>Add New</Button>
        <AddModal handleClose={() => setOpen(false)} isOpen={isOpen} /></>
}

const ActionBar = () => {
    return <div className={styles.row}>
        <AddBtn />
        <div className={`${styles.row} ${styles.alignLeft}`}>
            <FormControlLabel control={<SaveCheckbox />} label="Save new values to localStorage" />
            <Tooltip title="Unless checked, custom values will be deleted after the session" placement="top-end">
                <IconButton size="small">
                    <InfoOutlined fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </div>
    </div>
}

export default ActionBar