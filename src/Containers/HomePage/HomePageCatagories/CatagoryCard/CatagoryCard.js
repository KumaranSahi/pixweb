import classes from './CatagoryCard.module.css'

const CatagoryCard=({id,name,description,image})=>{
    return(
        <div className={classes["catagory-card"]}>
            <div className={classes['catagory-image-container']}>
                <img
                    src={image}
                    alt={name}
                    className={classes['catagory-image']}
                />
            </div>
            <h2>
                {name}
            </h2>
            <hr/>
            <p>
                {description}
            </p>
            <button className={`${classes["button-solid"]} ${classes["button-primary"]}`}>
                Start Learning
            </button>
        </div>
    )
}

export default CatagoryCard;