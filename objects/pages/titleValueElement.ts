
class TitleValueElement {
    title: object;
    value: object;

    constructor(element) {
        this.title = element.$('');
        this.value = element.$('');
    }

    getTitle(): string {
        return this.title.getText();
    }

    getValue() {
        return this.value.getText();
    }
}
