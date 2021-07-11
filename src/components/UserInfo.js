class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._name = document.querySelector(this._userNameSelector);
        this._about = document.querySelector(this._userInfoSelector);
        this._avatar = document.querySelector(this._userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent, 
            about: this._about.textContent
        };
    }

    setUserAvatar(data) {
        this._avatar.style.backgroundImage = `url(${data.avatar})`;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this.setUserAvatar(data);
        this._avatar.alt = `${data.name} avatar`;
    }
}

export default UserInfo;