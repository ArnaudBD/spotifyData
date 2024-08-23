import { useEffect, useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setProfile(data));
        }
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.display_name}</h1>
            <p>{profile.email}</p>
        </div>
    );
};

export default Profile;