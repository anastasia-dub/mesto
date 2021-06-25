class UserInfo {
    constructor(nameSelector, infoSelector) {
        this.name = document.querySelector(nameSelector);
        this.info = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return {
            name: this.name.textContent, 
            info: this.info.textContent
        };
    }

    setUserInfo(name, info) {
        this.name.textContent = name;
        this.info.textContent = info;
    }
}

export default UserInfo;