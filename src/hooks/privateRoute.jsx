import { Navigate } from "react-router";
import { FadeLoader } from "react-spinners";
import PropTypes from "prop-types";

function PrivateRoute({ userInfo, children, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FadeLoader color="#36d7b7" />
      </div>
    );
  }
  console.log("Private Route :");

  return userInfo.isAuthenticated ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  userInfo: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// The .shape() method in prop-types is used to define the structure of an object prop in React.

export default PrivateRoute;
