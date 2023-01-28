import React from 'react';
import Button from "../Button";
import Modal from "./Modal"
import {deleteUser, fetchUsers, selectUsersSelectedUser, updateUser} from "../../../store/usersSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {User} from "../../../types/types";

type Props = {
    active: boolean,
    setActive: Function,
}
const DeleteUserModal = ({active, setActive} : Props) => {

    const dispatch = useAppDispatch();
    const selectedUser = useAppSelector<User | null>(selectUsersSelectedUser)
    const userListUpdated = () => {
        dispatch(fetchUsers())
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className="flex flex-col gap-5">
                Are you sure you want to delete {selectedUser!.firstName} {selectedUser!.lastName}?
                <div className="flex gap-5 w-full justify-center">
                    <Button onClick={() => {
                        dispatch(deleteUser(selectedUser!.id)).then(() => userListUpdated())
                    }}>Yes</Button>
                    <Button onClick={() => setActive(false)}>No</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;