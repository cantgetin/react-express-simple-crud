import {useEffect, useState} from 'react'
import axios from 'axios'
import Modal from "./components/UI/Modal";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from "./components/UI/Button";

interface User {
    id: number,
    firstName: string,
    lastName: string,
    age: number
}

const ModalUser: Omit<User, "id"> = {
    age: 0, firstName: "", lastName: ""
}

function App() {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

    const fetchUsers = () => axios.get('http://localhost:8005/api/read')


    const [createModalActive, setCreateModalActive] = useState<boolean>(false)
    const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false)
    const [updateModalActive, setUpdateModalActive] = useState<boolean>(false)

    useEffect(() => {
        fetchUsers().then(r => setUsers(r.data));
    }, [])

    const userAdded = () => {
        fetchUsers().then(r => setUsers(r.data));
        setCreateModalActive(false)
    }

    const userUpdated = () => {
        fetchUsers().then(r => setUsers(r.data));
        setUpdateModalActive(false)
    }

    const openDeleteUserModal = (id: number) => {
        setSelectedUser(users.find(u => u.id == id))
        setDeleteModalActive(true)
    }

    const openUpdateUserModal = (id: number) => {
        setSelectedUser(users.find(u => u.id == id))
        setUpdateModalActive(true)
    }

    const deleteUser = (id: number) => {
        setDeleteModalActive(false)
        axios.get(`http://localhost:8005/api/delete/${id}`).then(r =>
            r.status == 200 ?
                fetchUsers().then(r => setUsers(r.data))
                : null
        )
    }

    return (
        <div className="App h-screen">
            <div className="bg-blue-400 flex gap-10 p-2">
                <Button>Users</Button>
            </div>
            <div className="h-full bg-blue-50">
                {
                    users ?
                        <div className="flex p-10 gap-5 flex-wrap">
                            {users.map(u =>
                                <div className="h-64 w-64 rounded-md shadow-md bg-blue-200 overflow-hidden" key={u.id}>
                                    <div className="bg-white h-3/4"></div>
                                    <div className="text-center px-2">
                                        <div>{u.firstName} {u.lastName} age: {u.age}</div>
                                        <Button onClick={() => openUpdateUserModal(u.id)}>Update</Button>
                                        <Button onClick={() => openDeleteUserModal(u.id)}>Delete</Button>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col h-64 w-64 rounded-md items-center justify-center
                             bg-white select-none cursor-pointer" onClick={() => setCreateModalActive(true)}>
                                <div className="text-6xl">+</div>
                                <div className="text-2xl">Create new user</div>
                            </div>
                        </div>
                        : null
                }
            </div>
            <Modal active={createModalActive} setActive={setCreateModalActive}>
                <Formik
                    initialValues={ModalUser}
                    // validate={values => {
                    //     const errors = {age: ''};
                    //     if (!values.name) errors.email = 'Required';
                    //     if (!value.surname) errors.surname = 'Required';
                    //     return errors;
                    // }}
                    onSubmit={(values, {setSubmitting}) => {
                        axios.post('http://localhost:8005/api/create', {...values}).then(r => {
                            r.status == 200
                                ? userAdded()
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
            </Modal>
            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <div className="flex flex-col gap-5">
                    Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}?
                    <div className="flex gap-5 w-full justify-center">
                        <Button onClick={() => deleteUser(selectedUser!.id)}>Yes</Button>
                        <Button onClick={() => setDeleteModalActive(false)}>No</Button>
                    </div>
                </div>
            </Modal>
            <Modal active={updateModalActive} setActive={setUpdateModalActive}>
                <div className="flex flex-col gap-5">
                    Update {selectedUser?.firstName} {selectedUser?.lastName}?

                    <Formik
                        initialValues={ModalUser}
                        // validate={values => {
                        //     const errors = {age: ''};
                        //     if (!values.name) errors.email = 'Required';
                        //     if (!value.surname) errors.surname = 'Required';
                        //     return errors;
                        // }}
                        onSubmit={(values, {setSubmitting}) => {
                            axios.post(`http://localhost:8005/api/update/${selectedUser!.id}`, {...values}).then(r => {
                                r.status == 200
                                    ? userUpdated()
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
        </div>
    )
}

export default App
