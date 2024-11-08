"use client";
import axios from "axios";
import { getData } from "./localStorage";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${getData("accessToken")}`,
  },
});

export default instance;
