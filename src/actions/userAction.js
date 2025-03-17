import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
    UPDATE_SHIP_REQUEST,
    UPDATE_SHIP_SUCCESS,
    UPDATE_SHIP_FAIL,
  } from "../constants/userConstant";
  import axios from "axios";
  import axiosClient from "../api/axiosClient.js";
  
  // Login
  export const login = (userName, passWord) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `token ${token}`,
        },
      };
  
      const data = await axiosClient.post(
        `/api/v1/login`,
        { userName, passWord },
        config
      );

      if(data.data === null){
        dispatch({ type: LOGIN_FAIL, payload: data.data });
        return
      }

      console.log("data 1", data.data)
      localStorage.setItem("token", data.data);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
  
  // Register
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      // const config = {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      //   },
      // };
      const config = {headers: {
          'Content-Type': 'application/json',
      }}
    // body: JSON.stringify(values),
      // const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axiosClient.post(
        `/api/v1/register`,
        userData,
        config
      );
      console.log("data register " + data)
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
      console.log("abcx",error.message)
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.message,
      });
    }
  };
  
  // Load User
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const token = localStorage.getItem("token");
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const data = await axiosClient.get(`/api/v1/auth/me`, config);
      console.log("load fai2ii")

      if(data.data === null){
        console.log("load faiii")
        dispatch({ type: LOAD_USER_FAIL, payload: data.msg });
        return;
      }

      dispatch({ type: LOAD_USER_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.message });
    }
  };
  
  export const logout = () => async (dispatch) => {
    try {
    //   await axiosClient.get(`/api/v1/logout`);
      localStorage.removeItem("token");
      console.log("abc ")
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.message });
    }
  };
  
//   // Update Profile
//   export const updateProfile = (userData) => async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_PROFILE_REQUEST });
  
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
  
//       const { data } = await axios.put(
//         `https://computer-shop-app.onrender.com/api/v1/me/update`,
//         {
//           name: userData.name,
//           email: userData.email,
//         },
//         config
//       );
  
//       dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_PROFILE_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Update Profile
//   export const updateShippingInfo = (shippingInfo) => async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_SHIP_REQUEST });
  
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
  
//       const { data } = await axios.put(
//         `https://computer-shop-app.onrender.com/api/v1/shippingInfo/update`,
//         {
//           shippingInfo,
//         },
//         config
//       );
  
//       dispatch({ type: UPDATE_SHIP_SUCCESS, payload: data.success });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_SHIP_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Update Password
//   export const updatePassword = (passwords) => async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
//       const token = localStorage.getItem("token");
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
  
//       const { data } = await axios.put(
//         `https://computer-shop-app.onrender.com/api/v1/password/update`,
//         {
//           oldPassword: passwords.oldPassword,
//           newPassword: passwords.newPassword,
//           confirmPassword: passwords.confirmPassword,
//         },
//         config
//       );
  
//       dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_PASSWORD_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Forgot Password
//   export const forgotPassword = (email) => async (dispatch) => {
//     try {
//       dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
//       const config = { headers: { "Content-Type": "application/json" } };
  
//       const { data } = await axios.post(
//         `https://computer-shop-app.onrender.com/api/v1/password/forgot`,
//         email,
//         config
//       );
  
//       dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
//     } catch (error) {
//       dispatch({
//         type: FORGOT_PASSWORD_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Reset Password
//   export const resetPassword = (token, passwords) => async (dispatch) => {
//     try {
//       dispatch({ type: RESET_PASSWORD_REQUEST });
  
//       const config = { headers: { "Content-Type": "application/json" } };
  
//       const { data } = await axios.put(
//         `https://computer-shop-app.onrender.com/api/v1/password/reset/${token}`,
//         passwords,
//         config
//       );
  
//       dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
//     } catch (error) {
//       dispatch({
//         type: RESET_PASSWORD_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // get All Users
//   export const getAllUsers = () => async (dispatch) => {
//     try {
//       dispatch({ type: ALL_USERS_REQUEST });
  
//       const token = localStorage.getItem("token");
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
  
//       const { data } = await axios.get(
//         `https://computer-shop-app.onrender.com/api/v1/admin/users`,
//         config
//       );
  
//       dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
//     } catch (error) {
//       dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
//     }
//   };
  
//   // get  User Details
//   export const getUserDetails = (id) => async (dispatch) => {
//     try {
//       dispatch({ type: USER_DETAILS_REQUEST });
//       const token = localStorage.getItem("token");
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
//       const { data } = await axios.get(
//         `https://computer-shop-app.onrender.com/api/v1/admin/user/${id}`,
//         config
//       );
  
//       dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
//     } catch (error) {
//       dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
//     }
//   };
  
//   // Update User
//   export const updateUser = (id, userData,shippingInfo) => async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_USER_REQUEST });
  
//       const token = localStorage.getItem("token");
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
  
//       const { data } = await axios.put(
//         `https://computer-shop-app.onrender.com/api/v1/admin/user/${id}`,
//         userData,
//         config
//       );
  
//       dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_USER_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Delete User
//   export const deleteUser = (id) => async (dispatch) => {
//     try {
//       dispatch({ type: DELETE_USER_REQUEST });
  
//       const token = localStorage.getItem("token");
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       };
  
//       const { data } = await axios.delete(
//         `https://computer-shop-app.onrender.com/api/v1/admin/user/${id}`,
//         config
//       );
  
//       dispatch({ type: DELETE_USER_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: DELETE_USER_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Clearing Errors
//   export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS });
//   };
  