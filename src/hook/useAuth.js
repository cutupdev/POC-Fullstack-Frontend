import { ConstructionOutlined } from '@mui/icons-material';
import api from '../utils/api';

export const login = async (data) => {
    console.log(data);
	const response = await api.post('users/signin', {
		username: data.username,
		password: data.password,
        checked: data.checked,
	});

	const token = response.data.token;
	if (token) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

export const isAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return {}
	}
	return JSON.parse(user);
};