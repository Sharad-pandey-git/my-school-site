import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom"
import { updateEvent, createEvent, deleteEventById, addImagesByEventId, deleteImageById, getAllWritings } from "../../admin/auth";
import { API } from "../../backend"
import Home from "../Home";
import { getAllEvents, getEventById } from "./galleryHelper";
import EventImagerHelper from "./imageHelper";

export function Gallery_small(isAdmin) {

  const [values, setValues] = useState({
    allEvents: [],
    error: "",
    loading: false,
    loadingFor: "",
    getaRedirect: false,
    isAddEvent: false,
    createdEvent: "",
    name: "",
    discription: '',
    thumbnail: "",
    formData: ""
  })

  const { allEvents, error, loading,
    getaRedirect, isAddEvent, formData, loadingFor,
    name, discription, thumbnail, createdEvent
  } = values;

  const preload = () => {
    setValues({
      ...values,
      loadingFor: "Loading....",
      loading: true
    })
    getAllEvents().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            allEvents: data,
            formData: new FormData(),
            loading: false,
            loadingFor: ""
          })
        }
      }
    )
  }

  useEffect(() => {
    preload();
  }, []);

  const onClickButton = () => {
    setValues({
      ...values,
      isAddEvent: true
    })
  }

  const onSubmitCreateEvent = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loadingFor: "Creating......",
      loading: true
    })
    createEvent(formData).then(_event => {
      if (_event.error) {
        setValues({
          ...values,
          error: _event.error,
          loading: false
        })
      } else {
        setValues({
          ...values,
          loading: false,
          loadingFor: "",
          error: "",
          createdEvent: _event.name,
          formData: new FormData()
        })
      }
    })
  }

  const successMessage = () => (
    <div className="alert alert-success  mt-3"
      style={{ display: createdEvent ? "" : "none" }}>
      <h4 className="text-success">{createdEvent} -> Event Created successfully</h4>
    </div>
  );
  const loadingMessage = () => (
    <div className="container text-center m-3">
      <h4>{loadingFor}</h4>
      <div className="spinner-border text-success text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  const handelChange = name => event => {
    const value = name === "thumbnail" ? event.target.files[0] : event.target.value;
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const ShowAddEventForm = () => (
    <div className="py-5" style={{
      display: isAddEvent ? "" : "none"
    }}>
      <form className="row g-3">
        <h2 className="text-center text-underline" ><u> ADD NEW EVENT </u></h2>
        {successMessage()}
        <div className="col-12">
          <label className="form-label">Event Name</label>
          <input type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={handelChange("name")}
          />
        </div>
        <div className="col-md-6">
          <label className="form label">Description</label>
          <textarea className="form-control"
            style={{
              width: "80vw"
            }}
            rows={5}
            name="discription"
            value={discription}
            onChange={handelChange("discription")}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="formFile" className="form-label">Thumbnail for Event</label>
          <input className="form-control"
            type="file"
            name="thumbnail"
            accept="image"
            onChange={handelChange("thumbnail")}
          />
        </div>

        <div className="col-12 mb-5 text-center">
          <button type="submit"
            className="btn btn-success"
            onClick={onSubmitCreateEvent}
          >Click Here To Add This Event </button>
        </div>
      </form>
    </div>
  )

  const ShowGallery = () => (
    <div id="gallery" className="img-fluid" style={isAdmin ? {} : {
      backgroundImage: 'url("https://images.unsplash.com/photo-1511151083847-62cedb3a5ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60")', backgroundRepeat: "no-repeat", backgroundPositionX: "center", backgroundPositionY: "center", backgroundSize: 'cover'
    }}>

      <section className="py-5 text-center container bg-image" >
        <h1 className="fw-dark" style={{ fontFamily: "'Coda Caption', sans-serif" }}> <p><u>GALLERY</u></p> </h1>
      </section>

      {isAdmin && loading && loadingMessage()}

      <div className="album py-5">
        <div className="container ">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {allEvents.map((_event, index) => {
              return (
                <div key={index} className="col">
                  <div className="card shadow-sm">

                    <EventImagerHelper event={_event} />

                    <div className="card-body d-flex flex-column justify-content-evenly alingn-item-center">
                      <p className="card-text eventhead text-dark">
                        {_event.name}
                      </p>
                      <div className="d-flex alingn-item-center">
                        <button type="button" className="btn btn-sm btn-outline-secondary"  >
                          {
                            isAdmin ? <Link className="text-dark" to={`/admin/gallery/${_event._id}`} style={{ textDecoration: "none" }}>
                              <span>View/Edit</span>
                            </Link> :
                              <Link className="text-dark" to={`/gallery/${_event._id}`} style={{ textDecoration: "none" }}>
                                <span>View</span>
                              </Link>
                          }

                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
          {isAdmin ?
            <div className="pt-5 text-center bg=primary">
              <button
                style={{
                  borderRadius: "5px"
                }}
                className="btn btn-primary"
                onClick={onClickButton}
              >
                Add A New Event
          </button>
            </div>
            :
            ""
          }
          {loading ? loadingMessage() : ShowAddEventForm()}

        </div>
      </div>

    </div>
  )



  return (
    <div>
      {ShowGallery()}
    </div>
  )

}

export function Writings() {

  const [values, setValues] = useState({
    allWritings: [],
    error: ""
  })

  const { allWritings, error

  } = values

  const preload = () => {
    getAllWritings().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            allWritings: data
          })
        }
      }
    )
  }

  useEffect(() => {
    preload()
  }, [])

  return (
    <div id="about">
      <hr className="featurette-divider" />
      {
        allWritings.map((_writing, index) => {
          let imgUrl = _writing._id ? `${API}/writing/image/${_writing._id}`
            :
            "https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          return (
            <div key={index}>
              <div className="row featurette">
                <div className={index % 2 == 0 ? "col-md-7" : "col-md-7 order-md-2"}>
                  <h2 className="featurette-heading"> {_writing.name} <span className="text-muted">{_writing.designation}</span></h2>
                  <p className="lead cardwrite"> {_writing.saying} </p>
                </div>
                <div className={index % 2 == 0 ? "col-md-5" : "col-md-5 order-md-1"}>
                  <img src={imgUrl} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto border border-dark" alt="" width={500} height={500} />
                </div>

              </div>
              <hr className="featurette-divider" />
            </div>
          )
        })
      }
    </div>
  )
}
export function homecards() {
  return (
    <div className="row pt-5" id="homecards">
      <div className="col-lg-4 text-center">
        <a href="/about" className="btn">
          <img src="https://images.unsplash.com/photo-1516383607781-913a19294fd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80" className="bd-placeholder-img rounded-circle" width={140} height={140} alt="" /> </a>

        <h2><a href="/about" className="btn"><h2>About</h2></a></h2>

        <p className="cardwrite">Step foot inside our lively classroom from the comfort of your home</p>
      </div>
      <div className="col-lg-4 text-center">
        <a href="/admission" className="btn">
          <img src="https://images.unsplash.com/photo-1598870783649-5f875f81cd0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" className="bd-placeholder-img rounded-circle" width={140} height={140} alt="" /> </a>

        <h2><a href="/admission" className="btn"><h2>Admission</h2></a></h2>

        <p className="cardwrite">Sign your child up for the upcoming school year today</p>
      </div>
      <div className="col-lg-4 text-center">
        <a href="#" className="btn">
          <img src="https://images.unsplash.com/photo-1522410818928-5522dacd5066?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" className="bd-placeholder-img rounded-circle" width={140} height={140} alt="" /> </a>

        <h2><a href="#" className="btn"><h2>Enrichment Programs</h2></a></h2>

        <p className="cardwrite">As the seasons change, keep an eye on what's ahead at My Little School</p>
      </div>
    </div>

  )
}

export function sociallinks() {
  return (
    <div className="d-flex flex-column alingn-item-center icons">
      <a href="https://www.facebook.com/" target="_blank" className="facebook">
        Facebook <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.instagram.com/" target="_blank" className="insta">
        Instagram <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.youtube.com/" target="_blank" className="youtube">
        Youtube <i class="fab fa-youtube"></i>
      </a>
    </div>
  )
}

export function Gallery_utility({
  isAdmin = false,
  eventName = "Event Name",
  _discription = "NO Description",
  eventId = "",
  imageArray = []
}) {

  const [values, setValues] = useState({
    name: "loading....",
    discription: "",
    event_id: "",
    thumbnail: "",
    error: "",
    loading: false,
    getaRedirect: false,
    updatedEvent: "",
    formData: "",
    deletionAlert: false,
    _reload: false
  })

  const {
    name, discription, thumbnail, error, loading,
    updatedEvent, getaRedirect, formData, event_id, deletionAlert, _reload
  } = values


  const preload = () => {
    getEventById(eventId).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            name: data.name,
            discription: data.discription,
            event_id: data._id,
            formData: new FormData()
          })
        }
      }
    )
  }


  useEffect(() => {
    preload()
  }, [])



  const onSubmitEvent = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true
    });
    updateEvent(formData, event_id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
          event_name: eventName,
          event_description: _discription,
          event_id: eventId,
          loading: false,
          updatedEvent: data.name,
          formData: new FormData()
        });
      }
    })

  };

  const onclickAddImages = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true
    });
    addImagesByEventId(formData, event_id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
          _reload: true,
          loading: false
        });
      }
    })
  }

  const deleteThisImage = Id => {
    deleteImageById(Id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
          _reload: true
        });
      }
    })
    console.log("Eent in image :-", Id)
  }

  const deleteThisEvent = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: ""
    })
    deleteEventById(event_id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
          getaRedirect: true,
          deletionAlert: false
        });
      }
    })

  }


  const handelChange = name => event => {
    if (name === "images") {
      const value = event.target.files
      for (let i = 0; i < event.target.files.length; i++) {
        let img = event.target.files[i]
        formData.append("images", img)
      }

    } else {
      const value = name === "thumbnail" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value })
    }
  };

  const successMessage = () => (
    <div className="alert alert-success alert-dismissible fade show mt-3" role="alert"
      style={{ display: updatedEvent ? "" : "none" }}
    >
      <h4 className="text-success">{updatedEvent} Updated successfully</h4>
    </div>
  );

  const deletionconfirmation = () => (
    <div className="alert alert-danger  mt-3"
      style={{ display: deletionAlert ? "" : "none" }}>
      <h4 className="text-success"> This will Delete the Whole Event including All The Images . Are you Sure you want to delete this Event ?</h4>
      <div className="d-flex flex-row justify-content-around">
        <button
          className="btn btn-sm btn-danger"
          style={{ borderRadius: "5px" }}
          onClick={deleteThisEvent}
        >Yes</button>
        <button
          className="btn btn-sm btn-primary"
          style={{ borderRadius: "5px" }}
          onClick={onclickNo}
        >No</button>
      </div>
    </div>
  );

  const onclickDeleteAlert = () => {
    setValues({
      ...values,
      deletionAlert: true
    })
  }

  const onclickNo = () => {
    setValues({
      ...values,
      deletionAlert: false
    })
  }


  const errorMessage = () => (
    <div className="alert alert-success  mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4 className="text-success">Updation Failed Error: {error} </h4>
    </div>
  );




  return (
    <div className="img-fluid" style={isAdmin ? { background: "#d9b3ff" } : {
      backgroundImage: 'url("https://images.unsplash.com/photo-1513367535130-be7b50539738?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")', backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: 'cover', borderRadius: '5px'
    }}>

      <section className="py-5 text-center container" >
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto pt-3" style={{ background: "rgba(0,0,0, 0.2)", borderRadius: "12px" }}>

            {deletionconfirmation()}
            {getaRedirect && <Redirect to="/admin/dashboard" />}
            {successMessage()}
            {errorMessage()}

            <h1 className="fw-light text-white">{name}</h1>
            {isAdmin && <button
              className="btn btn-danger text-white"
              onClick={onclickDeleteAlert}
            >Delete This Event</button>}

            {isAdmin &&
              <div className="form-group mb-3">
                <label
                  className="form-label mb-0 mt-3"><h4> Event Name </h4> </label>
                <input type="text"
                  name="name"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={name}
                  onChange={handelChange("name")}
                />
              </div>
            }
            {isAdmin ? <div className="form-group text-dark">
              <label htmlFor="formFileMultiple" className="form-label mb-0"><h4>Description</h4> </label>
              <textarea className="form-control"
                rows={5}
                value={discription}
                name="discription"
                onChange={handelChange("discription")}
              />
            </div>
              : <p className="lead text-light">{_discription}</p>
            }

            {
              isAdmin ? <div className="form-group text-dark">
                <label htmlFor="formFileMultiple" className="form-label mb-0"><h4> Thumbnail Image </h4>  </label>
                <input className="form-control" type="file"
                  name="thumbnail"
                  accept="image"
                  onChange={handelChange("thumbnail")}
                />
                <button className="btn btn-success btn-sm form-control mt-3"
                  type="submit"
                  onClick={onSubmitEvent}
                >
                  Update Event Info.
                </button>
              </div>
                : ""
            }
            {
              isAdmin ? ""
                :
                <p>
                  <a href="/" className="btn btn-primary my-2">Back To Home</a>
                  <a href="/#gallery" className="btn btn-secondary my-2">Back To Gallery</a>
                </p>
            }
          </div>
        </div>
      </section>

      <div className="album py-5 " >
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {
              imageArray.map((_image, index) => {
                return (
                  <div key={index} className="col" >
                    <div className="card shadow-sm">
                      <img
                        src={_image.imageBase64 ? `data:${_image.contentType};base64,${_image.imageBase64}`
                          :
                          "https://images.unsplash.com/photo-1537365587684-f490102e1225?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
                        }
                        className="bd-placeholder-img card-img-topk" alt="" width="100%" height={225} />
                      {isAdmin
                        &&
                        <button
                          className="mt-1 btn btn-danger"
                          style={{
                            borderRadius: "5px"
                          }}
                          onClick={() => {
                            deleteThisImage(_image._id)
                          }}
                        >Delete</button>}
                    </div>

                  </div>
                )
              })
            }

          </div>
          {
            isAdmin && <form action="" encctype="multipart/form-data" >
              <div className="mb-3 text-dark text-center mt-4">
                <label htmlFor="formFileMultiple" className="form-label"><u><h3> ADD MORE IMAGES </h3></u></label>
                {loading &&
                  <div className="container text-center m-3">
                    <h4>Adding Images Plz wait You Will Be automatically Redirected</h4>
                    <div className="spinner-border text-success text-center" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
                <input
                  className="form-control"
                  name="images"
                  type="file"
                  id="formFileMultiple" multiple
                  onChange={handelChange("images")}
                />
                {_reload && window.location.reload(true)}
                <button
                  className="btn btn-success btn-sm form-control"
                  onClick={onclickAddImages}
                >
                  Add Images
                </button>
              </div>
            </form>
          }

        </div>
      </div>

    </div>

  )
}

