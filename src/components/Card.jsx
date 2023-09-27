import "../styles/Card.css"

const Card = ({ poke, handleClick }) => {
  return (
    <div className="card" onClick={() => handleClick(poke.id)}>
      <img src={poke.img} alt={poke.name} />
      <div className="poke-name">{poke.name}</div>
    </div>
  );
};
export default Card;
