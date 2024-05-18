module.exports = class UserDto {
    name;
    surname;
    email;
    date;
    id;
    isActivated;

    constructor (UserModel) {
        this.name = UserModel.name,
        this.surname = UserModel.surname
        this.email = UserModel.email;
        this.date = UserModel.date
        this.id = UserModel.id;
        this.isActivated = UserModel.isActivated
    }
}