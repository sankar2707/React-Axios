import axios from "axios";
import { useLoaderData, useParams } from "react-router-dom";

export async function loader({ params: { id } }) {
  const { data } = await axios.get(`https://665eb2fb1e9017dc16f0f793.mockapi.io/users${id}`);

  return data;
}

const User = () => {

  const user = useLoaderData();

  return (
      <div>
        <h1>{user.username}</h1>
        <p>email: {user.email}</p>
        <p>Country: {user.country}</p>
    </div>
  )
}

export default User;