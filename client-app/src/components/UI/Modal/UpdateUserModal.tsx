import React from 'react';
import Modal from "./Modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {User} from "../../../types/types";
import {fetchUsers, selectUsersSelectedUser} from "../../../store/usersSlice";

type Props = {
    active: boolean,
    setActive: Function,
}
const UpdateUserModal = ({active, setActive} : Props) => {

    const dispatch = useAppDispatch();
    const selectedUser = useAppSelector<User | null>(selectUsersSelectedUser)
    const userListUpdated = () => {
        dispatch(fetchUsers())
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className="flex flex-col gap-5">
                Update {selectedUser?.firstName} {selectedUser?.lastName}?

                <Formik
                    initialValues={selectedUser!}
                    enableReinitialize={true}
                    // validate={values => {
                    //     const errors = {age: ''};
                    //     if (!values.name) errors.email = 'Required';
                    //     if (!value.surname) errors.surname = 'Required';
                    //     return errors;
                    // }}
                    onSubmit={(values, {setSubmitting}) => {
                        axios.post(`http://localhost:8005/api/update/${selectedUser!.id}`, {...values}).then(r => {
                            r.status == 200
                                ? userListUpdated()
                                : null
                        })
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <h1>Name:</h1>
                            <Field type="text" name="firstName" className="border border-blue-500 p-2"/>
                            <ErrorMessage name="email" component="div"/>
                            <h1>Surname:</h1>
                            <Field type="text" name="lastName" className="border border-blue-500 p-2"/>
                            <ErrorMessage name="password" component="div"/>

                            <h1>Age:</h1>
                            <Field type="number" name="age" className="border border-blue-500 p-2"/>
                            <ErrorMessage name="password" component="div"/>
                            <button type="submit" disabled={isSubmitting} className="block bg-blue-200">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;