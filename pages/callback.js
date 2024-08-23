import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem('access_token', data.access_token);
                    router.push('/profile');
                });
        }
    }, [router]);

    return <div>Loading...</div>;
};

export default Callback;