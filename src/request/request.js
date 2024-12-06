import instance from "./instance";

const tokenSToString = localStorage.getItem("token");
const userToken = JSON.parse(tokenSToString);
const signIn = async ({ link, data }) => {
  try {
    const result = await instance.post(link, data);
    if (result.data.length > 0) return result;
    return 0;
  } catch (err) {
    let message = "";
    if (err?.response?.data?.sql) {
      message = err?.response?.data?.sqlMessage;
    } else {
      message = err?.response?.data?.details[0]?.message;
    }
    throw message;
  }
};

const checkInput = async ({ link, data }) => {
  try {
    const result = await instance.post(link, data);
    return result;
  } catch (err) {
    let message = "";
    message = err?.response?.data?.details[0]?.message;
    throw message;
  }
};

const create = async ({ link, data }) => {
  try {
    const result = await instance.post(link, data);
    return result;
  } catch (err) {
    let message = "";
    if (err?.response?.data?.sql) {
      message = err?.response?.data?.sqlMessage;
    } else {
      message = err?.response?.data?.details[0]?.message;
    }
    throw message;
  }
};

const edit = async ({ link, data, key }) => {
  try {
    const result = await instance.put(`${link}/${key}`, data, {
      headers: {
        authorization: `${userToken}`,
      },
    });
    return result;
  } catch (err) {
    let message = "";
    if (err?.response?.data?.sql) {
      message = err?.response?.data?.sqlMessage;
    } else {
      message = err?.response?.data?.details[0]?.message;
    }
    throw message;
  }
};

const readCSV = async ({ link, formData }) => {
  try {
    const result = await instance.post(link, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const inputFoto = async ({ link, formData }) => {
  try {
    const result = await instance.put(link, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    return result;
  } catch (err) {
    let message = "";
    if (err?.response?.data?.sql) {
      message = err?.response?.data?.sqlMessage;
    } else {
      message = err?.response?.data?.details[0]?.message;
    }
    throw message;
  }
};

const remove = async ({ link }) => {
  try {
    const result = await instance.delete(link);
    return result;
  } catch (err) {
    throw err;
  }
};

const getData = async ({ link }) => {
  try {
    const result = await instance.get(link);
    return result;
  } catch (err) {
    throw err;
  }
};

// eslint-disable-next-line prettier/prettier
export {
  checkInput,
  create,
  getData,
  inputFoto,
  edit,
  readCSV,
  signIn,
  remove
};
