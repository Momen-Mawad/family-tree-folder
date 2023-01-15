import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAsyncEffect } from './useAsyncEffect'


const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useAsyncEffect( async () => {
        const fetchData = async () => {
            try {
                await axios.get(
                `${process.env.REACT_APP_API_URL}/authentication/csrf_cookie`,
               );

            } catch (err) {
                console.log(err)
            }
        };

        await fetchData();
        setcsrftoken([...csrftoken, getCookie('csrftoken')]);

    }, []);


    return (
        <input name="csrfmiddlewaretoken" value={csrftoken} type="hidden"/>
    );
};

export default CSRFToken;