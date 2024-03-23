import './App.scss';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DataTable from './DataTable';
import { useState } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ActionBar from './ActionBar';
import ValueContext from './ValueContext';
import ThemeSetter, { ThemeToggle } from './ThemeSetter';

function App() {
  const [baseSize, setBaseSize] = useState(16)

  const changeHandler = (e) => {
    if(e.target.value) setBaseSize(e.target.value)
  }

  return (
    <ThemeSetter> 
      <div className="App">
      <div className="header">
        <div>
          <h1>CSS Ratio Calculator</h1>
          <h2>A simple calculator for rem / em values</h2>
        </div>
        <ThemeToggle />
      </div>

      <TextField id="base-size" label="Base Font Size" variant="outlined" type="number" InputProps={{
        endAdornment: <InputAdornment position="end">px</InputAdornment>
      }} defaultValue={`${baseSize}`} onChange={changeHandler} />

      <section className="data-table">
        <ValueContext>
          <ActionBar />
          <DataTable baseSize={baseSize} />
        </ValueContext>
      </section>
    </div>
    </ThemeSetter>

  );
}

export default App;
