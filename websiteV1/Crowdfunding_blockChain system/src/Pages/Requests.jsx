import { histHeader, reqData } from '../../data';
import { useState } from 'react';
import '../style/all.min.css'
import Headerr from '../Components/history/Header';
import Table from '../Components/history/Table';

function Requests() {
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
            <Headerr onFilterChange={handleFilterChange} onSortChange={handleSortChange} pageTitle={"Requests"} />
            <Table data={filteredData} isRequestPage={true} />
        </div>
    );
}

export default Requests;