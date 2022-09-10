class ParentHesis {
    parentheses;
    closingParenthesis;
    itemsArray = [];
    itemsAmount = 0;
    blocks = [];
    blocksAmount = 0;
    isNested = false;
    parentClass;
    itemIndex = -1;
    leftOffset = 10;

    priority1ItemsAmount = 0;

    constructor(parentheses) {
        this.parentheses = parentheses;
        this.closingParenthesis = parentheses.querySelector(".closing_parenthesis");
        var parent = parentheses.parentNode;
        var parentType = parent.id.split("_")[0];
        if(parentType == "fraction") {
            this.isNested = true;
            this.parentClass = fractions[parseInt(parent.id.split("_")[1])];
        }
        else if(parentType == "parentheses") {
            this.isNested = true;
            this.parentClass = parenthesesArray[parseInt(parent.id.split("_")[1])];
        }
    }

    SetItemPosition(item) {
        var itemRect = item.getBoundingClientRect();
        if(item.className != "operator") {
            item.style = "top: 50%; transform: translate(0%, -50%);";
        }
        else {
            item.style = "transform: translate(0%, -100%);";
        }
        item.style.left = `${this.leftOffset}` + "px";
        this.leftOffset += itemRect.width + margin;
        this.parentheses.style.width = this.leftOffset + "px";

        this.itemsArray[this.itemsAmount] = item;
        this.itemsAmount++;

        if(this.itemIndex % 2 == 0) {
            this.leftOffset -= buttonWidth + margin;
            this.itemsAmount--;
        }
        this.itemIndex++;


        if(this.isNested) {
            this.parentClass.RecalculatePositions();
        }
        else {
            RecalculatePositions();
        }
    }
    AddBlock(block) {
        block.id = this.blocksAmount;
        this.blocks[this.blocksAmount] = block;
        this.blocksAmount++;
    }
    AddOperatorToBlock(operator, isPriority) {
        this.blocks[this.blocksAmount - 1].operator = operator;
        if(isPriority) {
            this.priority1ItemsAmount++;
        }
    }
    AddSecondItemToBlock(item) {
        if (this.blocksAmount > 1) {
            block = this.blocks[this.blocksAmount - 2];
            block.secondItem = item;
        }
    }
    RecalculatePositions() {
        this.leftOffset = 10;
        for(let i = 0; i < this.itemsArray.length; i++) {
            item = this.itemsArray[i];
            item.style.left = this.leftOffset + "px";
            this.leftOffset += item.getBoundingClientRect().width + margin;
        }
        this.parentheses.style.width = this.leftOffset + "px";
        if(this.isNested) {
            this.parentClass.RecalculatePositions();
        }
        else {
            RecalculatePositions();
        }
    }
    Calculate() {
        for (let i = 0; i < this.blocksAmount; i++) {
            var block = this.blocks[i];
            console.log(this.blocks);
            if(i + 1 < this.blocksAmount) {
                var nextBlock = this.blocks[i + 1];
                console.log(nextBlock);
                if(block.operator == "*" || block.operator == "/") {
                    nextBlock.firstItem = block.Calculate();
                }
                else {
                    if(nextBlock.operator == "*" || nextBlock.operator == "/") {
                        var result = 0;
                        var isFirstCycle = true;
                        do {
                            if(isFirstCycle) {
                                i++;
                                var currentBlock = this.blocks[i];
                                result = currentBlock.Calculate();
                                isFirstCycle == false;
                            }
                            else {
                                i++;
                                currentBlock.firstItem = result;
                                result = currentBlock.Calculate();
                            }
                            
                            if(i + 1 < blocksAmount) {
                                currentBlock = blocks[i + 1];
                                currentBlock.firstItem = result;
                            }
                            else {
                                break;
                            }
                        }
                        while(currentBlock.operator == "*" || currentBlock.operator == "/");
                        block.secondItem = result;
                        if(i + 1 < blocksAmount) {
                            blocks[i + 1].firstItem = block.Calculate();
                        }
                        else {
                            return block.Calculate();
                        }
                        
                    }
                    else {
                        nextBlock.firstItem = block.Calculate();
                    }
                }
                
            }
            else {
                return block.Calculate();
            }
    
        }






















        /*if(this.blocks == []) {
            console.log(false);
            return;
        }
        if(this.blocks[this.blocksAmount - 1].secondItem == null) {

            this.blocksAmount--;
            this.blocks[this.blocksAmount] = null;
        }
        var priorityOrder = [];
        var priority1Pos = 0;
        var priority2Pos = this.priority1ItemsAmount;
        for(let i = 0; i < this.blocksAmount; i++){
            block = this.blocks[i];
            if (block.operator == "*" || block.operator == "/") {
                console.log(true);
                priorityOrder[priority1Pos] = block;
                priority1Pos++;
            }
            else {
                console.log(false);
                priorityOrder[priority2Pos] = block;
                priority2Pos++;
            }
        }
        console.log(priorityOrder);
        for (let i = 0; i < this.blocksAmount; i++) {
            block = priorityOrder[i];
            var blockResult = block.Calculate();
            id = block.id;
            
            if (id < this.blocksAmount - 1) {
                this.blocks[id + 1].firstItem = blockResult;     
            }
            if(i < priority1ItemsAmount) {
                if(id > 0) {
                    this.blocks[id - 1].secondItem = blockResult;
                }
            }
            else {
                if(i < this.blocksAmount - 1) {
                    priorityOrder[i + 1].firstItem = blockResult;
    
                }
            }
    
            if(i == this.blocksAmount - 1) {
                return blockResult;
            }
    
        }*/
    }
}