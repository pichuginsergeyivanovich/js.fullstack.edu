import axios from "axios";

var config = Object.assign({}, require('../config.json'));

const API_URL = config.apiUrl;

const addSshKey = (name: string, key: string) => {
  const token = JSON.parse(localStorage.getItem("token") ?? "");

  return axios
    .post(
      `${API_URL}settings/sshkey/add`,
      { name: name, key: key },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log("data=", response);
    });
};

const getSshKeys = () => {
  console.log("getSshKeys begins");
  const token = JSON.parse(localStorage.getItem("token") ?? "");

  return axios
    .post(`${API_URL}settings/sshkey/list`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("data=", response);
    });
};

const SettingsService = {
  addSshKey,
  getSshKeys,
};

export default SettingsService;
