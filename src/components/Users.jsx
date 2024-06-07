import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export async function loader() {
    const users = await axios.get('https://665eb2fb1e9017dc16f0f793.mockapi.io/users');
    return { users: users.data };
}

const Users = () => {

    const { users } = useLoaderData();
    const [email,setEmail]=useState('');
    const [username, setUserName] = useState('');
    const [country, setCountry] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);

    const handleAddClick = (e) => {
        e.preventDefault();

        const newUser = {
            country,
            username,
            email,
            completed: completed === 'completed' ? true : false
        }

        axios.post(`https://665eb2fb1e9017dc16f0f793.mockapi.io/users`, newUser)
            .then((reponse) => {
                alert('User added successfully!')
                window.location.reload();
            })
            .catch((error) => {
                alert('Failed to add User!')
            });

        setCountry('');
        setUserName('');
        setEmail('');
    }

    const handleEdit = (user) => {
        setIsEditing(true);
        setCountry(user.country);
        setUserName(user.username);
        setEmail(user.email);
        setCompleted(user.completed);
        setUser(user);
    }

    const handleUpdateClick = (e) => {
        e.preventDefault();

        const updatedUser = {
            country,
            username,
            email,
            completed: completed === 'completed' ? true : false
        }

        axios.put(`https://665eb2fb1e9017dc16f0f793.mockapi.io/users/${user.id}`, updatedUser)
            .then((response) => {
                alert('User updated successfully!');
                setIsEditing(false);
                window.location.reload();
            })
            .catch((error) => {
                alert('Failed to update User!');
            });
    }

    const handleDelete = (id) => {
        axios.delete(`https://665eb2fb1e9017dc16f0f793.mockapi.io/users/${id}`)
            .then((response) => {
                alert('User deleted successfully!');
                window.location.reload();
            })
            .catch((error) => {
                alert('Failed to delete user!');
            });
    }

  return (
      <div>
          <h1>Users</h1>
            <ul style={{ listStyleType: 'none', fontSize: '18px' }}>
                {users.map((user) => (
                    <li
                        key={user.id}
                        style={{ textDecoration: user.completed ? 'line-through' : 'none', marginBottom: '20px'}}
                    >
                        <input 
                            type="checkbox"
                            checked={user.completed}
                            onChange={(e) => {

                            }}
                        />
                        <Link
                            to={`/users/${user.id}`}
                            style={{
                                marginRight: '20px', textDecoration: 'none', color: user.completed ? 'gray' : 'black'
                            }}
                        >{user.username}</Link>
                        <FontAwesomeIcon
                            icon={faEdit} 
                            onClick={() => handleEdit(user)}
                            style={{ cursor: 'pointer', marginRight: '20px'}}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(user.id)}
                        />

                    </li>
                ))}
          </ul>

          <form>

            <input
                type="text"
                placeholder="Enter UserName..." 
                value={username}
                onChange={(e) => setUserName(e.target.value)}    
              />
              <input
                type="text"
                placeholder="Enter Email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}    
              />
              <input
                type="text"
                placeholder="Enter country..." 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
              <select
                value={completed ? 'completed' : 'not completed'}
                onChange={(e) => setCompleted(e.target.value)}
              >
                <option>not completed</option>
                <option>completed</option>
            </select>
              {
                  isEditing ? (
                  <button
                    onClick={handleUpdateClick}
                  >Update User</button>
              ) : (
                <button onClick={handleAddClick}>Add User</button>
            )}
          </form>
    </div>
  )
}

export default Users;