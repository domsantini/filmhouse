import React from 'react'
import useGetUpcoming from '../../hooks/use-get-upcoming';
import Card from '../Card'

import styles from './UpcomingMovies.module.css'

function UpcomingMovies() {
    
    const upcomingMovies = useGetUpcoming()
    console.log({ upcomingMovies })
    
    return(
        <div>
            {upcomingMovies.map((upcomingMovie) => (
                <Card 
                    key={upcomingMovie.id}
                    title={upcomingMovie.title.title}
                    img={upcomingMovie.title.image.url}
                    releaseDate={upcomingMovie.releaseDate}
                />
            ))}
        </div>
    )
}

export default UpcomingMovies;