class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(domElem, place = 'prepend') {
        if (place ==='append') {
            this._container.append(domElem); 
        } else {
            this._container.prepend(domElem);
        }
    }

    renderItems(items) {
        items.forEach((card) => {
            this._renderer(card);
        });
    }
}

export default Section;