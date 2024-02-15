function Header({ onFilterChange, onSortChange }) {
    const handleChange = (event) => {
        const selectedStatus = event.target.value;
        onFilterChange(selectedStatus);
    };
    const handleSort = (event) => {
        const selectedStatus = event.target.value;
        onSortChange(selectedStatus);
    };
    return (
        <div className="flex" id='header'>
            <h2 className="bg-[#4acd8d]">Requests</h2>
            <div>
                <select className="select-dropdown mr-[5px]" onChange={handleChange}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <select className="select-dropdown" onChange={handleSort}>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
        </div>
    )
}

export default Header;