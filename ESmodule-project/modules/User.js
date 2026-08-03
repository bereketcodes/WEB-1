class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
export let x = 10;
    function printName(user) {
        console.log(user.name);
    }
    function printAge(user) {
        console.log(user.age);
    }


export default User;    
export { printName, printAge };
