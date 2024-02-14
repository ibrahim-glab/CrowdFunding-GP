import { reqData } from './data';
import { useState } from 'react';
import './App.css';
import './style/all.min.css';
import Header from './Components/Header';
import RequestTable from './Components/RequestTable';

function App() {
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Newest');
    const handleFilterChange = (selectedStatus) => {
        setFilter(selectedStatus);
    };
    const handleSortChange = (selectedSort) => {
        setSort(selectedSort);
    };
    const filteredData = filter === 'All' ? reqData : reqData.filter(item => item.status === filter);
    if (sort === 'Newest') {
        filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'Oldest') {
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return (
        <div className='container'>
            <Header onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
            <RequestTable filteredData={filteredData} />
        </div>
    );
}
export default App;