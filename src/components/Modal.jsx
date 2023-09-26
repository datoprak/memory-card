import "../styles/Modal.css";

const Modal = ({ title, message, buttons }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        {buttons.map(btn => {
          return (
            <div key={btn.name} className="buttons">
              <button onClick={btn.onClick}>{btn.name}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
