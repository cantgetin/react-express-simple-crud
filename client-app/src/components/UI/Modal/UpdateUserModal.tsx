import React from 'react';
import Modal from "./Modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {User} from "../../../types/types";
import {fetchUsers, selectUsersSelectedUser, updateUser} from "../../../store/usersSlice";
import Button from "../Button";

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
            <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold">Updating user {selectedUser?.firstName} {selectedUser?.lastName}</div>
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
                        dispatch(updateUser(values)).then(() => userListUpdated())
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <h1>Name:</h1>
                            <Field type="text" name="firstName" className="border border-blue-500 p-2 w-full"/>
                            <ErrorMessage name="email" component="div"/>
                            <h1>Surname:</h1>
                            <Field type="text" name="lastName" className="border border-blue-500 p-2 w-full"/>
                            <ErrorMessage name="password" component="div"/>

                            <h1>Age:</h1>
                            <Field type="number" name="age" className="border border-blue-500 p-2 w-full"/>
                            <ErrorMessage name="password" component="div"/>
                            <Button className="mt-5" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;