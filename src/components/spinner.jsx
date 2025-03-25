import React from 'react'

const Spinner = () => {
    return (
        <div role="status">
            <div class="loader"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner