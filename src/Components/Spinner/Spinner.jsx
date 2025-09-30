import "./Spinner.css"

const currentUser = JSON.parse(localStorage.getItem("user"));

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="details">
        <h2>WELCOME TO DARASA</h2>
        <p>{currentUser?.name || "Guest"}</p>
      </div>
      <div className="innerspinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default Spinner
