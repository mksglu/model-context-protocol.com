export const sanitizeText = (text: string): string => {
	return text
		.replace(/\u0000/g, '')
		.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '')
		.replace(/\\u0000/g, '')
		.replace(/\\u[0-9a-fA-F]{4}/g, '')
		.replace(/```json|```/g, '');
};
