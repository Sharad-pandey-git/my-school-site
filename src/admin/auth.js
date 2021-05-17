import { API } from "../backend"

// SIGN-IN SIGN-OUT HELPERS

export const signin = user => {
  // let _user = JSON.stringify(user)
  // console.log("CUSTOM USER ",_user)
  // console.log("API_______",API)
  return fetch(`${API}/signin`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
  ).then(response => {
    return response.json();
  }).catch(err => console.log(err))
};

export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export const signout = next => {
  if (typeof window != "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}signout`, {
      method: "GET"
    })
      .then(response => console.log(`singout success ${response}`))
      .catch(err => console.log(err))
  }
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};


// GENERAL HELPERS

export const getGeneral = () => {
  return fetch(`${API}/general`, {
    method: "GET"
  }).then(
    response => {
      return response.json();
    }
  ).catch(
    error => console.log("Error From F-E in getgeneral :", error)
  )
}

export const updateGeneral = (general_data) => {
  return fetch(`${API}/general/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json"
    },
    body: general_data
  })
    .then(response => {
      return response.json();
    }).catch(error => console.log("Error in F-E in updateGeneral : ", error))

}


// ############ Event Helpers ############

export const createEvent = (newEvent) => {
  return fetch(`${API}/event/create`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: newEvent
  })
    .then(res => {
      return res.json();
    })
    .catch(error => console.log("Error in F-E in createEvent : ", error))
}

export const updateEvent = (event_data, event_id) => {
  console.log("event data :- ",event_data)
  return fetch(`${API}/event/update/${event_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json"
    },
    body: event_data
  })
    .then(response => {
      return response.json();
    }).catch(error => console.log("Error in F-E in updateEvent : ", error))

}

export const deleteEventById = (event_id) =>{
  return fetch(`${API}/event/delete/${event_id}`,{
    method:"DELETE"
  }).then(res=>{
    return res.json();
  })
  .catch(
    error=> console.log("Error in F-E in DeleteEvent : ", error)
  )
}


// ########### Image Helper ############

export const addImagesByEventId = (img_data , event_id) =>{
  return fetch(`${API}/images/create/${event_id}`, {
    method : "POST",
    header:{
      Accept:"application/json"
    },
    body:img_data
  } ).then(response => {
    return response.json();
  }).catch(error => console.log("Error in F-E in AddingImages : ", error))
}

export const deleteImageById = (image_id) =>{
  return fetch(`${API}/image/delete/${image_id}`,{
    method:"DELETE"
  }).then(res=>{
    return res.json();
  })
  .catch(
    error=> console.log("Error in F-E in DeletImageById : ", error)
  )
}


// ############ Writings Helper ###############

export const getAllWritings = ()=>{
  return fetch(`${API}/allWritings`,{
    method:"GET"
  }).then(
    res=>{
      return res.json();
    }
  ).catch(
    error=> console.log("Error in F-E in DeletImageById : ", error)
  )
}

export const updateWritingById = (wrt_data, wrt_id) =>{
  // console.log("into updateWritings :- ", wrt_data, wrt_id)
  return fetch(`${API}/writing/update/${wrt_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json"
    },
    body: wrt_data
  })
    .then(response => {
      return response.json();
    }).catch(error => console.log("Error in F-E in updateEvent : ", error))
}

