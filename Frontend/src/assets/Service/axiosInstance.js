import axios from 'axios'
import React from 'react'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/"  ,
    headers:{
        'content-type' : 'application/json',

    }
});

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

// const userData = JSON.parse(localStorage.getItem("user") || "{}");
// const userId = userData.id;
// console.log("asdads"+typeof(userId))

export const SignUp = (userData)=>{
 return axiosInstance.post(`user/register`,userData);
};

export const logIn = (logInData)=>{
    return axiosInstance.post(`auth/signIn`,logInData);
}

export const addUserFeedback = (feedback,userId)=>{
    return axiosInstance.post(`feedback/add/${userId}`,feedback);
}

export const getUserFeedback = (userId)=>{
    return axiosInstance.get(`feedback/${userId}`);
}

export const updateFeedback=(feedId,updatedFeedback )=>{
    return axiosInstance.put(`feedback/update/${feedId}`,updatedFeedback);
}

export const getAllFeedbacks=()=>{
    return axiosInstance.get(`feedback/all`);
}

export const deleteFeedback=(feedId)=>{
    return axiosInstance.delete(`feedback/delete/${feedId}`);
}

export const feedbackDetails =(feedId)=>{
    return axiosInstance.get(`feedback/singlefeed/${feedId}`);
}
export default axiosInstance