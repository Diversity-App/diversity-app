export const passwordValidator = (password: string): string => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';
    if (!/^\d+$/.test(password)) return 'Password must be numeric.';
    if (password.length < 4) return 'Password must be at least 4 characters long.';

    return '';
};

export const nameValidator = (name: string): string => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';

    return '';
};
