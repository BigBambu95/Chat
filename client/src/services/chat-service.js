export default class ChatService {

    _apiUri = `http://localhost:3000`;
    

    async join(data) {
        try {
            const res = await fetch(`http://localhost:3000/api/users/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            return await res.json();
        } catch(err) {
            console.error(err);
        }
    }

    async login(data) {
        try {
            const res = await fetch(`http://localhost:3000/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            return await res.json();
        } catch(err) {
            console.error(err);
        }
    }

    async getProfile(data) {
        try {
            const res = await fetch(`http://localhost:3000/api/users/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            });
    
            return await res.json();
        } catch(err) {
            console.error(err);
        }
    } 

}