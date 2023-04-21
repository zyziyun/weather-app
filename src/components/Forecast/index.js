import { useState, Fragment } from 'react';
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
import { Thermometer, Clock} from 'react-feather';
import styles from "./index.module.scss";
import WeatherIcon from '../Weather/icon';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right"><Thermometer size={16} color={'blue'} style={{marginRight: '10px'}}/>{row.tempratures}</TableCell>
        <TableCell align="right"><WeatherIcon type={row.desc} size={16} color={'green'}/>{row.desc}</TableCell>
        <TableCell align="right">{row.visibility}</TableCell>
        <TableCell align="right">{row.other}</TableCell>
        <TableCell align="right">{row.wind}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <Clock style={{margin: '8px 10px 0 0'}} size={20} color="red"/>Hourly forecast
              </Typography>
              <Table aria-label="hourly forecast">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Feels LIKE</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.timelist.map((times) => (
                    <TableRow key={times.dt}>
                      <TableCell component="th" scope="row">
                        {times.time}
                      </TableCell>
                      <TableCell>{times.description}</TableCell>
                      <TableCell align="right">{times.feels_like}°C</TableCell>
                      <TableCell align="right" color="green">{times.humidity}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const formatTemp = (prefix, num) => {
  let num_str = parseInt(num) + '';
  if (num_str.length === 1) num_str = '0' + num_str;
  return prefix + ' ' + num_str + ' °C'
}

export default function Forecast({ forecast }) {
  const rows = Object.keys(forecast).map((name) => {
    const list = forecast[name];
    const temp = list.reduce((acc, item) => acc + item.temp, 0) / list.length;
    const temp_max = Math.max(...list.map((item) => item.temp_max));
    const temp_min = Math.max(...list.map((item) => item.temp_min));
    // const description = Array.from(new Set(list.map((item) => item.description))).join(',');
    const wind_speed = Math.round(list.reduce((acc, item) => acc + (item.speed || 0), 0) / list.length);
    const wind_deg = (list.reduce((acc, item) => acc + (item.deg || 0), 0) / list.length).toFixed(2);
    return {
        name, 
        tempratures: `${formatTemp('Max', temp_max)},${formatTemp('Min', temp_min)},${formatTemp('Avg', temp)}`, 
        desc: `${list[0].description}`, 
        visibility: `${list[0].visibility} km`, 
        other: `${list[0].humidity}% - ${list[0].pressure}hPa`, 
        wind: `${wind_speed} m/s - ${wind_deg}°`,
        timelist: list
      };
  });

  const table_header_sx = {fontSize: 16, color: 'black', fontWeight: 700};

  return (
    <>
      <div className={styles.title}>
        <div>Weather Forecast</div>
      </div>
      <div className={styles.table}>
        <TableContainer component={Paper} style={{ background: 'lightyellow' }}>
          <Table aria-label="collapsible table" sx={{ borderColor: 'black'}}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={table_header_sx}>Date</TableCell>
                <TableCell sx={table_header_sx} align="right">Tempature</TableCell>
                <TableCell sx={table_header_sx} align="right">Description</TableCell>
                <TableCell sx={table_header_sx} align="right">Visibility</TableCell>
                <TableCell sx={table_header_sx} align="right">Humidity/Pressure</TableCell>
                <TableCell sx={table_header_sx} align="right">AVG Wind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      </div>
      
    </>
    
  );
}
