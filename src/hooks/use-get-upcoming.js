import React from 'react'
import { range } from '../utils/index'

const apiKey = import.meta.env.VITE_IMDB_API_KEY;
console.log(apiKey)

function useGetUpcoming() {
    const [upcomingMovieIDs, setUpcomingMovieIDs] = React.useState([])
    const [upcomingMovieDetails, setUpcomingMovieDetails] = React.useState([])
    
    React.useEffect(() => {
        async function fetchUpcomingMovieIDs() {
            const url = 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies?homeCountry=US&purchaseCountry=US&currentCountry=US';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                const movieIDs = result.map(({ id }) => (
                    id.replace('title','').replaceAll('/','')
                ))
                
                setUpcomingMovieIDs(movieIDs)                
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchUpcomingMovieIDs()
    }, [])
    
    React.useEffect(() => {
        async function fetchUpcomingMovieDetails() {
            // Create an array of promises so that we can await for them all to be resolved before storing data. Async call back as you map over upcomingMovieIDs
            const movieDetailPromises = upcomingMovieIDs.slice(0,5).map(async movieID => {
                const url = `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${movieID}&currentCountry=US`; 
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': apiKey,
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                    }
                };
                
                try {
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    
                    const response = await fetch(url, options);
                    const result = await response.json();
                    return result            
                } catch (error) {
                    console.error(error);
                }
            })
            const movieDetails = await Promise.all(movieDetailPromises)
            
            setUpcomingMovieDetails(movieDetails)
        }
        
        if (upcomingMovieIDs.length > 0) {
            fetchUpcomingMovieDetails()
        }
    }, [upcomingMovieIDs])
    
    
    // Need to return something from custom hook
    return upcomingMovieDetails
}

export default useGetUpcoming