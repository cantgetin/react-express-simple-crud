import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {LoadingState, User} from "../types/types";
import {RootState} from "./store";

interface UsersState {
    users: User[]
    filteredUsers: User[]
    selectedUser: User
    loading: LoadingState
}

const initialState = {
    users: [],
    filteredUsers: [],
    selectedUser: {firstName: '', lastName: '', age: 0, id: 0},
    loading: LoadingState.Idle,
} as UsersState

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get<User[]>('http://localhost:8005/api/read')
        console.log(response.data)
        return response.data
    }
)

const usersSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {
        searchByName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                filteredUsers: [...state.users].filter((user) =>
                    user.firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(action.payload.toLowerCase()))
            };
        },
        setSelectedUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                selectedUser: action.payload
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = state.filteredUsers = action.payload
            state.loading = LoadingState.Succeeded
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = LoadingState.Failed
        })
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = LoadingState.Pending
        })
    },
})

export const {
    searchByName,
    setSelectedUser
} = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.users
export const selectUsersLoading = (state: RootState) => state.users.loading
export const selectUsersSelectedUser = (state: RootState) => state.users.selectedUser

export default usersSlice.reducer