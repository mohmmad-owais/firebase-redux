
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUsername } from "../redux/Users";
import axios from 'axios';


const ReduxExp = () => {

    const dispatch = useDispatch();

    const userList = useSelector((state) => state.users.value);

    const [counter, setCounter] = useState(0);

    const [data, newData] = useState([]);


    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");

    function counterVal() {
        if (counter < 1) {
            setCounter(0)
            alert('Value cannot exceed 0')
        }
        else {
            setCounter(counter - 1)
        }
    }


    async function apiFetch() {


        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //     .then(response => response.json())
        //     .then(json => newData(json))
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });


        fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json()).then(fetchData => console.log('New', fetchData))
        //        console.log('From Use State', data)

    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        //apiFetch();
    }, [])


    return (
        <div className="App">
            {" "}
            <div className="addUser">
                <input
                    type="text"
                    placeholder="Name..."
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        dispatch(
                            addUser({
                                id: userList[userList.length - 1].id + 1,
                                name,
                                username,
                            })
                        );
                    }}
                >
                    {" "}
                    Add User
                </button>

                <h2>Count {counter}</h2>

                <button onClick={() => setCounter(counter + 1)}>Counter</button>
                <button onClick={counterVal}>- Counter</button>
            </div>
            <div className="displayUsers">
                {userList.map((user) => {
                    return (
                        <div key={user.id}>
                            <h1> {user.name}</h1>
                            <h1> {user.username}</h1>
                            <input
                                type="text"
                                placeholder="New Username..."
                                onChange={(event) => {
                                    setNewUsername(event.target.value);
                                }}
                            />


                            <button
                                onClick={() => {
                                    dispatch(
                                        updateUsername({ id: user.id, username: newUsername })
                                    );
                                }}
                            >
                                {" "}
                                Update Username
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(deleteUser({ id: user.id }));
                                }}
                            >
                                Delete User
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default ReduxExp;
