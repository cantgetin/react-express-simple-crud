import {useEffect, useState} from 'react'
import Button from "./components/UI/Button";
import {LoadingState, User} from "./types/types"
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {
    fetchUsers,
    selectUsers,
    selectUsersLoading,
    setSelectedUser
} from "./store/usersSlice";
import DeleteUserModal from "./components/UI/Modal/DeleteUserModal";
import CreateUserModal from "./components/UI/Modal/CreateUserModal";
import UpdateUserModal from "./components/UI/Modal/UpdateUserModal";

function App() {

    const users = useAppSelector<User[]>(selectUsers);
    const loaded = useAppSelector<LoadingState>(selectUsersLoading)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (users.length === 0) dispatch(fetchUsers())
    }, [dispatch])

    const [createModalActive, setCreateModalActive] = useState<boolean>(false)
    const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false)
    const [updateModalActive, setUpdateModalActive] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <div className="App h-screen bg-blue-100">
            <div className="bg-blue-400 flex gap-10 p-2">
                <Button>Users</Button>
            </div>
            <div>
                {
                    loaded == LoadingState.Succeeded ?
                        <div className="flex p-10 gap-5 flex-wrap">
                            {users.map(u =>
                                <div className="h-64 w-64 rounded-md shadow-lg overflow-hidden" key={u.id}>
                                    <div className="bg-white h-3/4">
                                    </div>
                                    <div className="h-1/4 bg-blue-300 text-center" onMouseEnter={() => dispatch(setSelectedUser(u))}>
                                        <div>{u.firstName} {u.lastName} age: {u.age}</div>
                                            <Button className="mr-2" onClick={() => setUpdateModalActive(true)}>Update</Button>
                                            <Button className="bg-gray-700" onClick={() => setDeleteModalActive(true)}>Delete</Button>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col h-64 w-64 rounded-md shadow-lg items-center justify-center
                             bg-white select-none cursor-pointer" onClick={() => setCreateModalActive(true)}>
                                <div className="text-6xl">+</div>
                                <div className="text-2xl">Create new user</div>
                            </div>
                        </div>
                        : null
                }
            </div>
            <CreateUserModal active={createModalActive} setActive={setCreateModalActive}/>
            <UpdateUserModal active={updateModalActive} setActive={setUpdateModalActive}/>
            <DeleteUserModal active={deleteModalActive} setActive={setDeleteModalActive}/>
        </div>
    )
}

export default App
