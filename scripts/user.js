"use strict";

(function (core){

    class User{
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            //asi es como el profe define los instance variables *seu madrugea*
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }
        get displayName() {
            return this._displayName;
        }

        set displayName(value) {
            this._displayName = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            this._username = value;
        }


        toString(){
           return `Display Name: ${this._displayName}\n Email Number: ${this._emailAddress}\n 
                   User name: ${this._username}`
        }

        //Serialize for writing to localStorage
        serialize(){
            if(this._displayName !== "" && this._emailAddress !== "" && this._username !== ""){
                return `${this._displayName}, ${this._emailAddress}, ${this._username} `;
            }
            console.error("One or more of the User properties is missing or invalid");
            return null;
        }
        //  Deserialize is used to read data from localStorage
        deserialize(data){
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }
        toJSON(){
            return{
                displayName : this._displayName,
                emailAddress : this._emailAddress,
                username : this._username,
                password : this._password
            }
        }
        fromJSON(data){
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data.password;
        }


    }
    // namespace definition
    core.User = User;
})( core || (core = {}) );