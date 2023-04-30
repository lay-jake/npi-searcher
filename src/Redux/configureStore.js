import {SearchFields} from './searchFields'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer:{
        searchFields:SearchFields,
    }});