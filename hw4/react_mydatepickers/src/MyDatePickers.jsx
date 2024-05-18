import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { zhTW } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function formatToTaiwanDate(date) {
  if (!date) return '';
  const year = date.getFullYear() - 1911;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `民國${year}年-${month}月-${day}號`;
}

export default function MyDatePickers() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhTW}>
      <form className={classes.container} noValidate>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="生日"
          format="yyyy-MM-dd"
          value={selectedDate}
          onChange={handleDateChange}
          className={classes.textField}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          TextFieldComponent={(props) => (
            <TextField
              {...props}
              value={selectedDate ? formatToTaiwanDate(selectedDate) : ''}
            />
          )}
        />
      </form>
    </MuiPickersUtilsProvider>
  );
}
