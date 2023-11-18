import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        const createOrLoginUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const response = await fetch('http://localhost:8080/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                        }),
                    });

                    if (response.status === 201 || response.status === 409) {
                        console.log('Created or existing user');
                        const user = await response.json();

                        console.log(user)
                        
                    } else {
                        console.error('Error creating or verifying user');
                    }
                } catch (error) {
                    console.error('Network error creating or verifying user', error);
                }
            }
        };

        createOrLoginUser();
    }, [isAuthenticated, user, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user?.picture} alt={user?.name} />
                <h2>{user?.name}</h2>
                <p>Email: {user?.email}</p>
            </div>
        )
    );
};

export default Profile;
