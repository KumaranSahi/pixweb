import classes from "./CatagoryCard.module.css";
import { Link } from "react-router-dom";

export const CatagoryCard = ({ id, name, description, image }) => {
  return (
    <div className={classes["catagory-card"]}>
      <div className={classes["catagory-image-container"]}>
        <img src={image} alt={name} className={classes["catagory-image"]} />
      </div>
      <h2>{name}</h2>
      <hr />
      <p>{description}</p>
      <Link to={`/catagory/${id}`}>
        <button
          className={`${classes["button-solid"]} ${classes["button-primary"]}`}
        >
          Start Learning
        </button>
      </Link>
    </div>
  );
};