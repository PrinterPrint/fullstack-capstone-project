import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {urlConfig} from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.

    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6); // Initialize with minimum value
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);


    // Task 2. Fetch search results from the API based on user inputs.

    const handleSearch = async () => {
        // Construct the base URL for the search API endpoint
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;

        // Construct query parameters using the current search criteria
        const queryParams = new URLSearchParams({
            name: searchQuery,  // The search query entered by the user
            age_years: ageRange,  // The age range selected using the slider
            category: document.getElementById('categorySelect').value,  // The selected category
            condition: document.getElementById('conditionSelect').value  // The selected condition
        }).toString();  // Convert the query parameters to a string format

        try {
            // Fetch search results using the constructed URL with query parameters
            const response = await fetch(`${baseUrl}${queryParams}`);

            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Search failed');  // If not, throw an error
            }

            // Parse the response data (assuming it's in JSON format)
            const data = await response.json();

            // Update the state with the fetched search results
            setSearchResults(data);

        } catch (error) {
            // Log any errors that occurred during the fetch operation
            console.error('Failed to fetch search results:', error);
        }
    };

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/app/product/${productId}`);
    };




    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            <label htmlFor="categorySelect">Category</label>
                            <select id="categorySelect" className="form-control my-1">
                                <option value="">All</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="conditionSelect">Condition</label>
                            <select id="conditionSelect" className="form-control my-1">
                                <option value="">All</option>
                                {conditions.map((condition) => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>
                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <label htmlFor="ageRange">Less than {ageRange} years</label>
                            <input
                                type="range"
                                className="form-control-range"
                                id="ageRange"
                                min="1"
                                max="10"
                                value={ageRange}
                                onChange={(e) => setAgeRange(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria*/}
                    <div className="form-group">
                        <label htmlFor="searchQuery">Search for a product</label>
                        <input type="text" id="searchQuery" className="form-control"
                               value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    <button onClick={handleSearch} className="btn btn-primary mt-3">
                        Search
                    </button>
                    {/*Task 5: Display search results and handle empty results with a message. */}
                    <div className="search-results mt-4">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <div key={product.id} className="card mb-3">
                                    {/* Check if product has an image and display it */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            {product.description.slice(0, 100)}...
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button onClick={() => goToDetailsPage(product.id)} className="btn btn-primary">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No products found. Please revise your filters.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
