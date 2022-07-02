export type Navigation = {
    navigate: (scene: string, params: {}) => void;
};

export type User = {
    username: string;
    password: string;
};

export type HTTPRequest = {
    url: string;
    data: User;
};

export type StringError = {
    value: string;
    error: string;
};
