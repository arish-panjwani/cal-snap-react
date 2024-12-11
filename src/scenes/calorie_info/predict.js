/** @format */

import axios from "axios";
import FormData from "form-data";

export async function predictFood(file) {
  const url = "/api/upload"; // Proxy path instead of full backend URL

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      const prediction = response.data.prediction || "No prediction available";
      console.log(`Prediction: ${prediction}`);
      return prediction;
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("An error occurred during prediction:", error.message);
    throw error;
  }
}
