import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const PasswordField = ({
  required,
  id,
  label,
  autoFocus,
  error,
  disabled,
  helperText,
  innerRef,
  inputProps,
  visibilityDisabled,
  sx,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant='filled'
      fullWidth
      margin='normal'
      error={error}
      autoFocus={autoFocus}
      sx={{ my: 0, ...sx }}
      disabled={disabled}
      ref={innerRef}
      required={required}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FilledInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        required={required}
        {...inputProps}
        {...props}
        aria-describedby='my-helper-text'
        endAdornment={
          !disabled &&
          !visibilityDisabled && (
            <InputAdornment position='end' sx={{ mr: 1 }}>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </IconButton>
            </InputAdornment>
          )
        }
        label='Password'
      />
      {error && helperText && (
        <FormHelperText id='my-helper-text'>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordField;
