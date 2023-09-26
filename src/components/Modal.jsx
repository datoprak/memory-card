import "../styles/Modal.css";

const Modal = ({ title, message, btn, loading }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {loading ? (
          <h1>LOADING</h1>
        ) : (
          <>
            <h2>{title}</h2>
            <p>{message}</p>
            <button onClick={btn.onClick}>{btn.name}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
