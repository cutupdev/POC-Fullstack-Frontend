import api from '../utils/api';

export const getData = async () => {
	const response = await api.get('users/signin', data);
	const token = response.data.authToken;
	if (token) {
		localStorage.setItem('user', JSON.stringify(response.data.authToken));
	}
	return response.data;
};