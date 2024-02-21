import { histData } from '../../data';
import { useState } from 'react';
import { histHeader } from '../../data';
import '../style/all.min.css';
import Headerr from '../Components/history/Header';
import Table from '../Components/history/Table';

function Hist() {
    const [sort, setSort] = useState('Newest');

    const handleSortChange = (selectedSort) => {
        setSort(selectedSort);
    };

    if (sort === 'Newest') {
        histData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'Oldest') {
        histData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return (
        <div className='container'>
            <Headerr onSortChange={handleSortChange} pageTitle={"History Of Transactions"} />
            <Table data={histData} isRequestPage={false} />
        </div>
    );
}

export default Hist;