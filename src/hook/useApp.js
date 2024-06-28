import api from '../utils/api';

export const getData = async () => {
	const token = localStorage.getItem('user')
	try {
		const response = await api.get(
			'files/getFiles',
			{
				headers: {
					'Authorization': `Bearer ${token.replace(/"/g, '')}`,
				},
			}
		);
		return response.data.files;
	} catch (error) {
		console.log(error)
		return false;
	}
};

export const getCategory = async () => {
	const token = localStorage.getItem('user')
	try {
		const response = await api.get(
			'category/getCategories',
			{
				headers: {
					'Authorization': `Bearer ${token.replace(/"/g, '')}`,
				},
			}
		);
		return response.data.categories;
	} catch (error) {
		console.log(error)
		return false;
	}
};