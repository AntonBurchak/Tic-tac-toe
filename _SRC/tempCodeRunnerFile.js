// jshint esversion:6
// import './assets/css/style.scss';

// import './assets/css/normalize.css';



// // import './assets/css/swiper.min.css';

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./assets/js/react-app";

// ReactDOM.render(<App />, document.querySelector("#test"));

class User {
    constructor(name, age, login) {
        this.name   = name;
        this.age    = age;
        this.login  = login;
    }

    showInfo() {
        let str = `${this.name}, ${this.age}, ${this.login}`;
        return console.log(str);
    }
}

let anton = new User('Anton', 18, '@AntonBurchak');
anton.showInfo();

class Admin extends User {
    constructor(name, age, login, type) {
        super(name, age, login);
        let type = type;
    }
    showInfo() {
        let str = `${this.name}, ${this.age}, ${this.login}, ${this._type}`;
        return console.log(str);
    }
}

let antonAdmin = new Admin('Anton', 18, '@AntonBurchak', 'SuperBoss');
antonAdmin.showInfo();
antonAdmin._type = 'Durak';
antonAdmin.showInfo();
