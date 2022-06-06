export const API_ENDPOINT = "https://carsapp2050.herokuapp.com/api/v1/cars/";

export async function getCars() {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}

export async function addCar(values) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}

export async function updateCar(id, values) {
  try {
    const response = await fetch(`${API_ENDPOINT}${id}`, {
      method: "PUT",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) throw response;

    return [id, values];
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}

export async function deleteCar(id) {
  try {
    const response = await fetch(`${API_ENDPOINT}${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "Application/json",
      },
    });
    if (!response.ok) throw response;
    return id;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}
