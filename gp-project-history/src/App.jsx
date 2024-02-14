import { histData } from './data';
import { useState } from 'react';
import './App.css';
import './style/all.min.css';
import Header from './Components/Header';
import HistoryTable from './Components/HistoryTable';

function App() {
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
            <Header onSortChange={handleSortChange} />
            <HistoryTable />
        </div>
    );
}
export default App;