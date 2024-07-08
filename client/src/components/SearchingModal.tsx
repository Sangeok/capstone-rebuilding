import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react';
import { Facility } from '../store/user-store';
import { Link } from 'react-router-dom';
import useGetSearchFacilities from '../hooks/useGetSearchFacilities';
import Pagination from './Pagination';

interface SearchingModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SearchingModal({open, setOpen}: SearchingModalProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const {
        currentFacilities,
        totalPages,
        currentPage,
        setCurrentPage,
        handleSearch
    } = useGetSearchFacilities(searchTerm);

    const handleInput = (value: string) => {
        setSearchTerm(value);
    };
    
    return (
        <Modal
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="flex flex-col items-center space-y-2">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Searching for name
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, width: '100%' }}>
                    <div className="w-full max-w-md mx-auto mb-4">
                        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="검색어를 입력하세요..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-md mx-auto">
                        {currentFacilities.map((facility) => (
                            <Link
                                to={`/Searching/${facility.id}`}
                                state={{ data: facility }}
                                className="flex border-slate-400  flex-1 p-4 items-center mb-2 border-2 w-full"
                                key={facility.BIZPLC_NM}
                            >
                                {facility.BIZPLC_NM}
                            </Link>
                        ))}
                    </div>
                </Typography>
                <div className="flex flex-grow">
                    <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mt: 2 }}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </Typography>
                </div>
            </Box>
        </Modal>
    );
}