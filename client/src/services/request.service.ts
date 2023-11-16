export const publicRequest = async () : Promise<void> =>{
    const {VITE_API_URL : url} = import.meta.env
    const response = await fetch(`${url}/public`);
    const data = await response.json();
    console.log(data)
}

export const protectedRequest = async (getToken: () => Promise<string | null>): Promise<void> => {
    const {VITE_API_URL: url} = import.meta.env
    const token = await getToken();
    console.log(token);
    const response: Response = await fetch(`${url}/protected`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}