import React, { useState, useContext } from 'react';
import { Box, Avatar, IconButton, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';  // Menu Icon
import { ToggledContext } from '../../../App'; // Adjust path as needed
import { tokens } from '../../../theme';  // Adjust path if needed
import avatar from '../../../assets/images/avatar.png'; // Adjust path as needed
import logo from '../../../assets/images/logo.png'; // Adjust path as needed
import Item from './Item';  // Adjust path as needed

const ExerciseSidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // Manage sidebar collapse state
  const { toggled, setToggled } = useContext(ToggledContext);  // If you need toggling
  const theme = useTheme();  // Get theme colors
  const colors = tokens(theme.palette.mode);  // Get custom colors based on theme

  return (
    <Box
      sx={{
        width: collapsed ? '60px' : '250px',  // Sidebar width changes when collapsed
        height: '100vh',  // Full height
        backgroundColor: colors.primary[400],  // Custom background color from theme
        transition: 'width 0.3s',  // Smooth transition for collapsing
      }}
    >
      <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          color={colors.greenAccent[500]}
          sx={{ visibility: collapsed ? 'hidden' : 'visible' }}
        >
          Exercise Sidebar
        </Typography>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuOutlined sx={{ color: colors.gray[100] }} />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', mb: '25px' }}>
        <Avatar alt="avatar" src={avatar} sx={{ width: '100px', height: '100px' }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
            Test User
          </Typography>
        </Box>
      </Box>

      <Box mb={5} pl={collapsed ? undefined : '5%'}>
        <Item title="Exercise Dashboard" path="/" colors={colors} />
        <Item title="Exercise Log" path="/exercise-log" colors={colors} />
      </Box>
    </Box>
  );
};

export default ExerciseSidebar;
