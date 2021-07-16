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
        if (typeof data !== 'object') return;

        if (data.avatar) {
            this._avatar.style.backgroundImage = `url(${data.avatar})`;
        }
    }

    setUserInfo(data) {
        if (typeof data !== 'object') return;

        if (data.name) {
            this._name.textContent = data.name;
            this._avatar.alt = `${data.name} avatar`;
        }

        if (data.about) {
            this._about.textContent = data.about;
        }

        this.setUserAvatar(data);
    }
}

export default UserInfo;