import React from "react";
import {API} from "../../backend";

const EventImagerHelper = ({ event }) =>{
    const imageUrl = event? `${API}/event/image/${event._id}` : "https://images.unsplash.com/photo-1516478379578-ea8bea43365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"

    return(
    <img 
        src={imageUrl} 
        className="bd-placeholder-img card-img-topk" 
        alt="image" 
        width="100%" 
        height={225} />
    )
}

export default EventImagerHelper ;