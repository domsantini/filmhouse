import React from 'react'
import styles from './Card.module.css'

function Card({ img, title, releaseDate, children }) {
    
    return(
        <div className={styles.wrapper}>
            <img src={img} className={styles.image}/>
            <p>{title}</p>
            <p>{releaseDate}</p>
        </div>
    )
}

export default Card;