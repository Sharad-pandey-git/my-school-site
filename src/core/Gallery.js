import Base from "./Base";
import React, { useState, useEffect } from "react";
import { Gallery_utility } from "./helper/homeutils"
import { useParams } from "react-router-dom";
import { getEventById, getImagesOfEventId } from "../core/helper/galleryHelper"

export default function Gallery() {
  const { id } = useParams();

  const [values, setValues] = useState({
    event_name: "Loading.......",
    _discription: "--> Please wait <--",
    images_data: [],
    event_error: "",
    image_error: "",
    error: false
  });

  const { event_name,
    error,
    _discription,
    images_data,
    image_error,
    event_error } = values;
  
  
  const preload = () => {
    getEventById(id).then(data => {
      if (data.error) {
        getImagesOfEventId(id).then(img_data => {
          if (img_data.error) {
            setValues({
              ...values,
              image_error: data.error,
              event_error: data.error,
              error: true
            })
          }
          else {
            setValues({
              ...values,
              event_error: data.error,
              images_data: img_data
            })
          }
        })
      }
      else {
        getImagesOfEventId(id).then(img_data => {
          if (data.error) {
            setValues({
              ...values,
              image_error: data.error,
              event_name: data.name,
              _discription: data.discription,
            })
          }
          else {
            setValues({
              ...values,
              event_name: data.name,
              _discription: data.discription,
              images_data: img_data
            })
          }
        })

      }
    }
    )
  };

  useEffect(() => {
    preload()
  }, []);

  if (error) {
    return (
      <Base>
        <div>
          {"ERROR WHILE FETCHING EVENT DATA : " + event_error === "" ? image_error : event_error}
        </div>
      </Base>
    )
  }
  return (
    <Base>
      {Gallery_utility({ isAdmin: false, eventName: event_name, _discription: _discription, imageArray: images_data , eventId:id})}
    </Base>
  )
}


