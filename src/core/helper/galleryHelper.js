import { API } from "../../backend";

export const getAllEvents = ()=>{
    return fetch(`${API}/allEvents`,{
        method: "GET"
      }).then(
        response =>{
          return response.json();
        }
      ).catch(
        error => console.log("Error From F-E in getAllEvents in galleryHelper :",error)
      )
}

export const getEventById = (Id)=>{
  return fetch(`${API}/event/${Id}`,{
    method:"GET"
  }).then(
    res =>{
      return res.json();
    }
  ).catch(
    error => console.log("Error From F-E in getEventById in galleryHelper :",error)
  )
}

export const getImagesOfEventId = (Id)=>{
  return fetch(`${API}/images/${Id}`,{
    method:"GET"
  }).then(
    res =>{
      return res.json();
    }
  ).catch(
    error => console.log("Error From F-E in getImagesOfEventId in galleryHelper :",error)
  )
}