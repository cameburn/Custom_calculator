class Fraction {
    fraction;
    width;
    height;
    isNested = false;
    parentClass;
    upperItems = [];
    upperItemsAmount = 0;
    upperBlocks = [];
    upperBlocksAmount = 0;
    upperItemsWidth = 0;
    upperItemIndex = -1;
    lowerItems = [];
    lowerItemsAmount = 0;
    lowerBlocks = [];
    lowerBlocksAmount = 0;
    lowerItemsWidth = 0;
    lowerItemIndex = -1;
    innerHeight = 23;

    constructor(fraction, rect) {
        this.fraction = fraction;
        this.width = rect.width;
        this.height = rect.height;

        var parent = fraction.parentNode;
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

    SetItemPosition(item, isUpper) {
        var itemRect = item.getBoundingClientRect();
        if(isUpper) {
            console.log("upper")
            item.style.left = `${this.upperItemsWidth}` + "px";
            this.upperItemsWidth += itemRect.width + margin;
            if (this.upperItemsWidth > this.width) {
                this.Expand(true);
            }
            this.upperItems[this.upperItemsAmount] = item;
            if(this.upperItemIndex % 2 == 0) {
                this.upperItemsWidth -= buttonWidth + margin;
            }
            else {
                this.upperItemsAmount++;
            }

            item.style.top = `${this.innerHeight - itemRect.height}` + "px";

            
            this.upperItemIndex += 1;
        }
        else {
            console.log("lower")
            item.style.left = `${this.lowerItemsWidth}` + "px";
            this.lowerItemsWidth += itemRect.width + margin;
            if (this.lowerItemsWidth > this.width) {
                this.Expand(false);
            }
            this.lowerItems[this.lowerItemsAmount] = item;
            if(this.lowerItemIndex % 2 == 0) {
                this.lowerItemsWidth -= buttonWidth + margin;
            }
            else {
                this.lowerItemsAmount++;
            }

            item.style.bottom = `${this.innerHeight - itemRect.height}` + "px";

            this.lowerItemIndex += 1;
        }
        if(this.isNested) {
            this.parentClass.RecalculatePositions();
        }
        else {
            RecalculatePositions();
        }
    }
    AddBlock(block, isUpper) {
        if(isUpper) {
            block.id = this.upperBlocksAmount;
            this.upperBlocks[this.upperBlocksAmount] = block;
            this.upperBlocksAmount++;
        }
        else {
            block.id = this.upperBlocksAmount;
            this.lowerBlocks[this.lowerBlocksAmount] = block;
            this.lowerBlocksAmount++;
        }
    }
    AddOperatorToBlock(operator, isUpper) {
        if(isUpper) {
            this.upperBlocks[this.upperBlocksAmount - 1].operator = operator;
        }
        else {
            this.lowerBlocks[this.lowerBlocksAmount - 1].operator = operator;
        }
        
    }
    AddSecondItemToBlock(item, isUpper) {
        if(isUpper) {
            if(this.upperBlocksAmount > 1) {
                var block = this.upperBlocks[this.upperBlocksAmount - 2];
                block.secondItem = item;
            }
        }
        else {
            if (this.lowerBlocksAmount > 1) {
                var block = this.lowerBlocks[this.lowerBlocksAmount - 2];
                block.secondItem = item;
            }
        }
    }
    Expand(isUpper) {
        if(isUpper) {
            this.fraction.style.width = this.upperItemsWidth + "px";
            this.width = this.upperItemsWidth;
            RecalculatePositions();
        }
        else {
            this.fraction.style.width = this.lowerItemsWidth + "px";
            this.width = this.lowerItemsWidth;
            RecalculatePositions();
        }
    } 
    RecalculatePositions() {
        this.upperItemsWidth = 0;
        for(let i = 0; i < this.upperItems.length; i++) {
            item = this.upperItems[i];
            item.style.left = this.upperItemsWidth + "px";
            this.upperItemsWidth += item.getBoundingClientRect().width + margin;
        }
        this.upperItemsWidth -= buttonWidth;
        this.lowerItemsWidth = 0;
        for(let i = 0; i < this.lowerItems.length; i++) {
            item = this.lowerItems[i];
            item.style.left = this.lowerItemsWidth + "px";
            this.lowerItemsWidth += item.getBoundingClientRect().width + margin;
        }
        this.lowerItemsWidth -= buttonWidth;
        console.log(this.upperItemsWidth);
        console.log(this.lowerItemsWidth);
        if(this.lowerItemsWidth < this.upperItemsWidth) {
            this.fraction.style.width = this.upperItemsWidth + "px";
            this.width = this.upperItemsWidth - buttonWidth;
        }
        else {
            this.fraction.style.width = this.lowerItemsWidth + "px";
            this.width = this.lowerItemsWidth - buttonWidth;
        }

        if(this.isNested) {
            this.parentClass.RecalculatePositions();
            item.style.left = this.lowerItemsWidth + "px";
            this.lowerItemsWidth += item.getBoundingClientRect().width + margin;
        }
        else {
            RecalculatePositions();
        }
    }

    Calculate() {
        return this.CalculateBlocks(this.upperBlocks, this.upperBlocksAmount) / 
        this.CalculateBlocks(this.lowerBlocks, this.lowerBlocksAmount);
    }

    CalculateBlocks(blocks, blocksAmount) {
        for (let i = 0; i < blocksAmount; i++) {
            var block = blocks[i];
            if(i + 1 < blocksAmount) {
                var nextBlock = blocks[i + 1];
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
                                var currentBlock = blocks[i];
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
    }
}