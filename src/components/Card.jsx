import "../styles/Card.css";
import img from "../assets/card-back.png";

const Card = ({ poke, handleClick, flip }) => {
  const flipClass = flip ? "flip" : "";
  const back = flip ? "" : "back";

  return (
    <div className="card" onClick={() => handleClick(poke.id)}>
      <div className="inner">
        <div className={`front ${flipClass}`}>
          <img src={poke.img} alt={poke.name} />
          <div className="poke-name">{poke.name}</div>
        </div>
        <div className={back}>
          <img src={img} alt="pokemon card back" className="card-back" />
        </div>
      </div>
    </div>
  );
};
export default Card;
