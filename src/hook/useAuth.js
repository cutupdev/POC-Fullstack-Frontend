import api from '../utils/api';

export const login = async (data) => {
	const response = await api.post('users/signin', data);
	const token = response.data.authToken;
	if (token) {
		localStorage.setItem('user', JSON.stringify(response.data.authToken));
	}
	return response.data;
};

export const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('files');
}

export const isAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return null;
	}
	return JSON.parse(user);
};