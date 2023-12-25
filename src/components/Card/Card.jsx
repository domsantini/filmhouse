import React from 'react'
import styles from './Card.module.css'

function Card({ img, title, releaseDate, children }) {
    
    return(
        <div className={styles.wrapper}>
            <img src={img} className={styles.image}/>
            <p className={styles.test}>{title}</p>
            <p className={styles.test}>{releaseDate}</p>
        </div>
    )
}

export default Card;