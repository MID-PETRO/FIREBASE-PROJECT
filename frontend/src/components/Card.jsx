const Card = ({ id, title, image }) => {
  return (
    <div>
      <h2>Numero: {id}</h2>
      <h3>titulo: {title}</h3>
      <img src={image} alt={id} />
    </div>
  );
};

export default Card;
