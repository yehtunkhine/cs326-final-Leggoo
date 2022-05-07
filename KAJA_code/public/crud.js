export async function createAcc(accID, accName, age, email, password) {
    const response = await fetch(
      `/acc/create?accID=${accID}&accName=${accName}&age=${age}&email=${email}&password=${password}`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
}
  
export async function getAcc(accID) {
  const response = await fetch(`/acc/read?accID=${accID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function updateAcc(accID, accName, age, email, password) {
  const response = await fetch(
    `/acc/update?accID=${accID}&accName=${accName}&age=${age}&email=${email}&password=${password}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteAcc(accID) {
  const response = await fetch(`/acc/delete?accID=${accID}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function getAllAcc() {
  const response = await fetch(`/acc/all`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function getAccEvent(accID) {
  const response = await fetch(`/acc/getEvent?accID=${accID}`, {
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
