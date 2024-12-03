/** @format */

// UserProfile.js
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns"; // Install with `npm install date-fns`

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Siddhi Patel",
    userSince: "",
    location: "Surat, India",
    bio: "Write something about you here",
    age: "",
    gender: "",
    goal: "Be Fitter",
    dietPreference: "Vegetarian",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://api.example.com/user/profile"
        );
        const data = response.data;

        const userSince = data.created_at
          ? format(new Date(data.created_at), "dd MMMM yyyy")
          : "";

        setUserInfo({
          name: `${data.first_name} ${data.last_name}`,
          location: `${data.city}, ${data.country}`,
          bio: data.bio || "Write something about you here",
          age: data.age || "",
          gender: data.gender || "",
          goal: data.goal || "Be Fitter",
          dietPreference: data.dietPreference || "Vegetarian",
          profilePicture: data.profilePicture || "",
          userSince: userSince,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Profile Picture */}
        <Grid item xs={12} md={3} textAlign="center">
          <label htmlFor="profile-upload">
            <Avatar
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                cursor: "pointer",
              }}
              src={userInfo.profilePicture}
            />
          </label>
          <input
            id="profile-upload"
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Grid>

        {/* Name and Location */}
        <Grid item xs={12} md={9}>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            {editMode ? (
              <TextField
                fullWidth
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            ) : (
              userInfo.name
            )}
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            {userInfo.userSince} | {userInfo.location}
          </Typography>
        </Grid>
      </Grid>

      {/* Bio Section */}
      <Box mt={4}>
        <Typography variant="h6">Bio:</Typography>
        {editMode ? (
          <TextField
            fullWidth
            multiline
            rows={3}
            name="bio"
            value={userInfo.bio}
            onChange={handleInputChange}
            variant="outlined"
          />
        ) : (
          <Typography>{userInfo.bio}</Typography>
        )}
      </Box>

      {/* Age and Gender */}
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Age"
            name="age"
            type="number"
            value={userInfo.age}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            disabled={!editMode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Gender"
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            disabled={!editMode}
          />
        </Grid>
      </Grid>

      {/* Primary Goal */}
      <Box mt={3}>
        <Typography variant="h6">Primary Goal:</Typography>
        {editMode ? (
          <TextField
            fullWidth
            name="goal"
            value={userInfo.goal}
            onChange={handleInputChange}
            variant="outlined"
          />
        ) : (
          <Typography>{userInfo.goal}</Typography>
        )}
      </Box>

      {/* Diet Preference */}
      <Box mt={3}>
        <Typography variant="h6">Food Preferences:</Typography>
        {editMode ? (
          <TextField
            fullWidth
            name="dietPreference"
            value={userInfo.dietPreference}
            onChange={handleInputChange}
            variant="outlined"
          />
        ) : (
          <Typography>{userInfo.dietPreference}</Typography>
        )}
      </Box>

      {/* Edit Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleEditMode}
          sx={{
            width: { xs: "100%", sm: "auto" },
            px: { sm: 4 },
          }}>
          {editMode ? "Save" : "Edit"}
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
