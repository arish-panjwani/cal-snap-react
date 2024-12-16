# Cal-Snap React Dashboard

Cal-Snap is a web application designed to assist users in tracking their daily caloric intake and exercise routines. This branch enhances the user experience by integrating a responsive dashboard interface built with React and Bootstrap.

## Features

- **User Authentication**: Secure login and registration system to protect user data.
- **Dashboard Overview**: Visual representation of daily caloric intake and exercise metrics.
- **Food Logging**: Snap / Upload food items to track calorie consumption.
- **Exercise Logging**: Record physical activities to monitor calories burned.
- **Progress Charts**: Graphical display of user progress over time.
- **Responsive Design**: Optimized for various devices, ensuring accessibility on desktops, tablets, and smartphones.

## Technologies Used

- **Frontend**: React, Bootstrap 5, Material UI
- **State Management**: Redux
- **Routing**: React Router
- **Backend**: Java Springboot
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone -b bootstrap_dashboard https://github.com/arish-panjwani/cal-snap-react.git
   cd cal-snap-react
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and configure the following variables:

   ```env
   VITE_API_URL=""
   VITE_API_IMG_URL=""
   VITE_API_HEALTH_SCORE_URL=""
   ```

   Contact for exact base URL

   These variables point to the backend services required for the application.

4. **Run the Application**:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:5173`.

## Backend Setup

The backend services for this project are available in a separate repository. To set up the backend:

1. **Clone the Backend Repository**:

   ```bash
   git clone https://github.com/MukulGarg0097/CalSnap.git
   cd CalSnap
   ```

## Contributing

Contributions are welcome! Please fork the repository and create a new branch for any feature additions or bug fixes. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Redux](https://redux.js.org/)

---

This updated README provides clear instructions on setting up both the frontend and backend of the Cal-Snap application, ensuring that developers can easily understand and contribute to the project. 
