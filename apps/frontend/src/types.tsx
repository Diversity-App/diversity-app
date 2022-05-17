export type Navigation = {
    navigate: (scene: string) => void;
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
