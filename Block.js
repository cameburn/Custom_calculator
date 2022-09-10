class Block {
    id;
    firstItem;
    firstItemResult;
    operator;
    secondItem;
    secondItemResult;
    result = 0;

    constructor(firstItem) {
        this.firstItem = firstItem;
    }

    Calculate() {
        if(Number.isFinite(this.firstItem)) {
            this.firstItemResult = this.firstItem;
        }
        else if(this.firstItem.className == "fraction") {
            this.firstItemResult = fractions[parseInt(this.firstItem.id.split("_")[1])].Calculate();
        }
        else if (this.firstItem.className == "parentheses") {
            this.firstItemResult = parenthesesArray[parseInt(this.firstItem.id.split("_")[1])].Calculate();
        }
        else if (this.firstItem.className == "int") {
            this.firstItemResult = parseFloat(this.firstItem.querySelector(".int_inner").value);
        }
        if(Number.isFinite(this.secondItem)) {
            this.secondItemResult = this.secondItem;
        }
        else if(this.secondItem == null) {
            return this.firstItemResult;
        }
        else if(this.secondItem.className == "fraction") {
            this.secondItemResult = fractions[parseInt(this.secondItem.id.split("_")[1])].Calculate();
        }
        else if (this.secondItem.className == "parentheses") {
            this.secondItemResult = parenthesesArray[parseInt(this.secondItem.id.split("_")[1])].Calculate();
        }
        else if (this.secondItem.className == "int") {
            this.secondItemResult = parseFloat(this.secondItem.querySelector(".int_inner").value);
        }

        console.log(this.firstItemResult);
        console.log(this.secondItemResult);
        console.log(this.operator);

        switch(this.operator) {
            case '+':
                this.result = this.firstItemResult + this.secondItemResult;
                return this.result;
            case '-':
                this.result = this.firstItemResult - this.secondItemResult;
                return this.result;
            case '*':
                this.result = this.firstItemResult * this.secondItemResult;
                return this.result;
            case '/':
                this.result = this.firstItemResult / this.secondItemResult;
                return this.result;
        }
        return 0;

    }
}