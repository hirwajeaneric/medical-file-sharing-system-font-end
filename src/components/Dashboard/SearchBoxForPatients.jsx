import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormInput } from '../HomePage/InstitutionsComponents';

export default function SearchBoxForPatients() {
    const navigate = useNavigate();
    const params = useParams();

    const [search, setSearch] = useState('');
    const [progress, setProgress] = useState('');
    const [error, setError] = useState('');

    const handleSearchInput = ({currentTarget: input }) => {
        setSearch(input.value);
        setError('');
        navigate(`/${params.institution}/${params.role}/results`)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (search === '') {
            setError('Enter a value first !!');
            return;
        } else {
            setError('');
            // setProgress('Searching ...');
            // setTimeout()
            localStorage.setItem('searchData', search);
        }
    }
    
    return (
        <SearchContainer onSubmit={handleSubmit}>
            <FormInput style={{ margin: '0px', padding: '0px' }}>
                <input type="text" name="search" id="search" 
                    style={error ? { outlineWidth: 'thin', outlineStyle: 'solid' ,outlineColor: 'red', color: 'red' } : {outlineWidth: 'thin', outlineStyle: 'solid' ,outlineColor: '#c2d6d6',}} 
                    placeholder={error ? error : 'Search patient ...'} 
                    value={search} 
                    onChange={handleSearchInput}
                />
            </FormInput>
            <Button variant='contained' color='primary' type='submit' size='small'>{progress ? progress :"Search"}</Button>
        </SearchContainer>
    )
}

const SearchContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
`;