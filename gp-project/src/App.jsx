import { reqData } from './data';
import { useState } from 'react';
import './App.css';
import './style/all.min.css';
import Header from './Components/Header';
import RequestTable from './Components/RequestTable';

function App() {
    const [filter, setFilter] = useState('All');

    const handleFilterChange = (selectedStatus) => {
        setFilter(selectedStatus);
    };

    const filteredData = filter === 'All' ? reqData : reqData.filter(item => item.status === filter);
    return (
        <div className='container'>
            <Header onFilterChange={handleFilterChange} />
            <RequestTable filteredData={filteredData} />
        </div>
    );
}
export default App;