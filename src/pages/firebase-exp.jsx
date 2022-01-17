import { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';


function FirebaseExp() {

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, "users");

    const getUsers = async () => {
        const data = await getDocs(collectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
        console.log(users);
    }


    const createUser = async () => {

        await addDoc(collectionRef, { name: newName, age: Number(newAge) });
        getUsers();

    };



    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
        getUsers();

    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        getUsers();

    };

    useEffect(() => {
        getUsers();

    }, [])


    return (
        <div className="App">
            <h2> Firebase CRUD... </h2>
            {loading ? <h2>Loading.!</h2> :
                (
                    <>

                        <input
                            placeholder="Name..."
                            value={newName}
                            onChange={(event) => {
                                setNewName(event.target.value);
                            }}
                        />
                        <input
                            type="number"
                            value={newAge}
                            placeholder="Age..."
                            onChange={(event) => {
                                setNewAge(event.target.value);
                            }}
                        />

                        <button type='button' onClick={createUser}> Create User</button>
                        <div style={{ display: 'flex', flexDirection: 'column', maginBottom: 10, justifyContent: 'center' }}>
                            {users.map((item, index) => {
                                return (
                                    <div style={{ display: 'flex' }} key={index}>
                                        <h2>Name: {item.name}</h2>
                                        <h2 style={{ marginLeft: 30 }}>Age: {item.age}</h2>
                                        <button
                                            type='button'
                                            style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                                            onClick={() => {
                                                updateUser(item.id, item.age);
                                            }}
                                        >
                                            Increase Age
                                        </button>
                                        <button
                                            type='button'
                                            style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                                            onClick={() => {
                                                deleteUser(item.id);
                                            }}
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )



            }



        </div >
    )
}

export default FirebaseExp
