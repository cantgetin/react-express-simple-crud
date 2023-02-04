import React from 'react';
import Modal from "./Modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {User} from "../../../types/types";
import {createUser, fetchUsers, selectUsersSelectedUser, updateUser} from "../../../store/usersSlice";
import Button from "../Button";

type Props = {
    active: boolean,
    setActive: Function,
}
const CreateUserModal = ({active, setActive}: Props) => {

    const dispatch = useAppDispatch();
    const selectedUser = useAppSelector<User | null>(selectUsersSelectedUser)
    const userListUpdated = () => {
        dispatch(fetchUsers())
        setActive(false)
    }

    const ModalUser: Omit<User, "id"> = {
        age: 0, firstName: "", lastName: ""
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold">Creating new user</div>
                <Formik
                    initialValues={ModalUser}
                    validate={values => {
                        const errors = {age: '', firstName: '', lastName: ''};
                        if (!values.firstName) errors.firstName = 'First name is required.';
                        if (!values.lastName) errors.lastName = 'Last name is required.';
                        if (!values.age || values.age < 0 || values.age > 150) errors.age = 'Age can\'t be less than zero and more than 150.';
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        dispatch(createUser(values)).then(() => userListUpdated())
                        resetForm()
                        setSubmitting(false)
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <h1>Name:</h1>
                            <Field type="text" name="firstName" className="bg-slate-200 border shadow-md shadow-inner p-2 my-1 rounded-md w-full"/>
                            <ErrorMessage name="firstName" component="div" className="text-red-600 w-full"/>
                            <h1>Surname:</h1>
                            <Field type="text" name="lastName" className="bg-slate-200 border shadow-md shadow-inner p-2 my-1 rounded-md w-full"/>
                            <ErrorMessage name="lastName" component="div" className="text-red-600 w-full"/>

                            <h1>Age:</h1>
                            <Field type="number" name="age" className="bg-slate-200 border shadow-md shadow-inner p-2 my-1 rounded-md w-full"/>
                            <ErrorMessage name="age" component="div" className="text-red-600 w-full"/>
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

export default CreateUserModal;