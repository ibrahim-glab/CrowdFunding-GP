
function Header({ onFilterChange }) {
    const handleChange = (event) => {
        const selectedStatus = event.target.value;
        onFilterChange(selectedStatus);
    };
    return (
        <div className="flex" id='header'>
            <h2>Requests</h2>
            <select className="select-dropdown" onChange={handleChange}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
    )
}

export default Header;