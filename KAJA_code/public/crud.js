export async function createUser(userID, userName, age, email, password) {
    const response = await fetch(
      `/user/create?userID=${userID}&userName=${userName}&age=${age}&email=${email}&password=${password}`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
}
  
export async function getUser(userID) {
  const response = await fetch(`/user/read?userID=${userID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function updateUser(userID, userName, age, email, password) {
  const response = await fetch(
    `/user/update?userID=${userID}&userName=${userName}&age=${age}&email=${email}&password=${password}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteUser(userID) {
  const response = await fetch(`/user/delete?userID=${userID}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function getAllUser() {
  const response = await fetch(`/user/all`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function getUserEvent(userID) {
  const response = await fetch(`/user/getEvent?userID=${userID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}





export async function createUser(userID, userName, age, email, password) {
  const response = await fetch(
    `/user/create?userID=${userID}&userName=${userName}&age=${age}&email=${email}&password=${password}`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  return data;
}

export async function getUser(userID) {
  const response = await fetch(`/user/read?userID=${userID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function updateUser(userID, userName, age, email, password) {
  const response = await fetch(
    `/user/update?userID=${userID}&userName=${userName}&age=${age}&email=${email}&password=${password}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteUser(userID) {
  const response = await fetch(`/user/delete?userID=${userID}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function getAllUser() {
  const response = await fetch(`/user/all`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

  
