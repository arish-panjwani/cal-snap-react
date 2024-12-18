/**
 * eslint-disable react/prop-types
 *
 * @format
 */

import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
  UploadOutlined,
  SearchOutlined,
  MedicalInformationOutlined,
  FastfoodOutlined,
  MedicalServicesOutlined,
  DashboardCustomizeOutlined,
  SportsGymnasticsOutlined,
  InfoOutlined,
  PhotoCamera,
  LogoutOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import { FaSnapchat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAnyCookie } from "../../../api/helper";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const onClickTopLogo = () => {
    setCollapsed(!collapsed);
    // navigate("/");
  };

  return (
    <Sidebar
      width={!isNonMobile ? "52%" : undefined}
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md">
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}>
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            {!collapsed && (
              <Box
                onClick={onClickTopLogo}
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}>
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Argon"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}>
                  CalSnap
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}>
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              {getAnyCookie("first_name")}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}></Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}>
          <Item
            title="Dashboard"
            path="/dashboard"
            colors={colors}
            icon={<DashboardOutlined />}
          />
          {/* <Item
            title="Log Exercise"
            path="/exercise"
            colors={colors}
            icon={<UploadOutlined />}
          /> */}
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}>
          {!collapsed ? "Eat" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}>
          {/* <Item
            title="Search"
            path="/search"
            colors={colors}
            icon={<SearchOutlined />}
          /> */}
          <Item
            title="Snap / Upload"
            path="/snap-upload"
            colors={colors}
            icon={<PhotoCamera />}
          />
          <Item
            title="Calorie History"
            path="/calorie-history"
            colors={colors}
            icon={<FastfoodOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}>
          {!collapsed ? "Exercise" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}>
          <Item
            title="Summary"
            path="/exercise-summary"
            colors={colors}
            icon={<DashboardCustomizeOutlined />}
          />
          <Item
            title="Log Exercise"
            path="/log-exercise"
            colors={colors}
            icon={<SportsGymnasticsOutlined />}
          />
          <Item
            title="Exercise History"
            path="/exercise-history"
            colors={colors}
            icon={<ReceiptOutlined />}
          />
        </Menu>

        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}>
          {!collapsed ? "Predict" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}>
          <Item
            title="Health Score"
            path="/health-score"
            colors={colors}
            icon={<MedicalServicesOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}>
          {!collapsed ? "Info" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}>
          <Item
            title="Profile"
            path="/profile"
            colors={colors}
            icon={<ContactsOutlined />}
          />
          <Item
            title="Health Profile"
            path="/health-profile"
            colors={colors}
            icon={<MedicalInformationOutlined />}
          />
          <Item
            title="About Us"
            path="/about"
            colors={colors}
            icon={<InfoOutlined />}
          />
        </Menu>
      </Box>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{
          color: colors.primary["disabled"],
          marginBottom: "10px",
          // marginRight: "20px",
        }}>
        Version 1.1
      </Typography>
    </Sidebar>
  );
};

export default SideBar;
