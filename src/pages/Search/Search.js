import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { HashLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import Loading from '../Loading/Loading';
import FormFields from '../../components/FormFields/FormFields';

import SearchLogic from './SearchLogic';
import AutocompleteBookAttr from '../../components/AutocompleteBookAttr/AutocompleteBookAttr';
import BookList from '../../components/BookList/BookList';

function Search() {
  const { pageStatus, onTitleSelect, resultBids } = SearchLogic();

  return (
    <>
      <Navbar />
      <SectionContainer>
        <AutocompleteBookAttr
          attr='title'
          placeholder='Titre du livre'
          wholeBook
          autoFocus
          onSelect={onTitleSelect}
          sx={{ minHeight: '100vh', py: 12 }}
        />
        {pageStatus === 'loading-books' ? (
          <Loading />
        ) : pageStatus === 'results ' ? (
          <BookList bids={resultBids} />
        ) : (
          <></>
        )}
      </SectionContainer>
    </>
  );
}

export default Search;