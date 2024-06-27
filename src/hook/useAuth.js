import api from '../utils/api';

export const login = async (data) => {
	try {
		const response = await api.post('users/signin', data);
		const token = response.data.authToken;
		if (token) {
			localStorage.setItem('user', JSON.stringify(response.data.authToken));
		}
		return response.data;
	} catch(error) {
		console.log('Error generated during login ===> ', error);
		return error;
	}
};

export const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('files');
}

export const profile = async (data) => {
	const authInf = localStorage.getItem('user')
	try {
		const response = await api.post(
			'users/profile', 
			data,
			{
				headers: {
					'Authorization': `Bearer ${authInf.replace(/"/g, '')}`,
				},
			}
		);
		const token = response.data.authToken;
		if (token) {
			localStorage.setItem('user', JSON.stringify(response.data.authToken));
		}
		return response.data;
	} catch(error) {
		console.log('Error generated during profile mordifying ===> ', error);
		return error;
	}
};

export const isAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return null;
	}
	return JSON.parse(user);
};