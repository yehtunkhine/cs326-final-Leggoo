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


export async function createEvent(eventID, eventName, date, time, capacity, category) {
  const response = await fetch(
    `/event/create?eventID=${eventID}&eventName=${eventName}&date=${date}&time=${time}&capacity=${capacity}&category=${category}`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  return data;
}

export async function getEvent(eventID) {
  const response = await fetch(`/event/read?eventID=${eventID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function updateEvent(eventID, eventName, date, time, capacity, category) {
  const response = await fetch(
    `/event/update?eventID=${eventID}&eventName=${eventName}&date=${date}&time=${time}&capacity=${capacity}&category=${category}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteEvent(eventID) {
  const response = await fetch(`/event/delete?eventID=${eventID}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function getAllEvent() {
  const response = await fetch(`/event/all`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
