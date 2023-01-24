import React from 'react';
import Button from "../Button";
import axios from "axios";
import Modal from "./Modal";
import {fetchUsers, selectUsersSelectedUser} from "../../../store/usersSlice";
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
                        axios.get(`http://localhost:8005/api/delete/${selectedUser!.id}`).then(r =>
                            r.status == 200 ?
                                userListUpdated()
                                : null
                        )
                    }}>Yes</Button>
                    <Button onClick={() => setActive(false)}>No</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;