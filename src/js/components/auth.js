export class Auth {
    constructor() {
        if (!localStorage.getItem('awe'))
            localStorage.setItem('awe', 0);
        this.isAutheticated = Boolean(Number(localStorage.getItem('awe')));
    }

    static login() {
        localStorage.setItem('awe', 1);
        this.isAutheticated = Boolean(Number(localStorage.getItem('awe')));
    }

    static logout() {
        localStorage.setItem('awe', 0);
        this.isAutheticated = Boolean(Number(localStorage.getItem('awe')));
    }
}