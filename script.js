var doc = document,
calcContainer = doc.querySelector(".calc_container"),
selectionMenu = doc.querySelector(".selection_menu"),
selectionMenuItems = selectionMenu.querySelectorAll(".selection_item"),
selectionOperatorMenu = doc.querySelector(".selection_operator_menu"),
createButtonPrefab = doc.querySelector(".add_button"),
createOperatorButtonPrefab = doc.querySelector(".create_operator_button"),
intPrefab = doc.querySelector(".int"),
fractionPrefab = doc.querySelector(".fraction"),
parenthesesPrefab = doc.querySelector(".parentheses"),
operatorPrefab = doc.querySelector(".operator"),
resultField = doc.querySelector(".result_field");

var currentButton,
lastClone,
itemsWidth = 0;

var fractions = [],
fractionsAmount = 0,
parenthesesArray = [],
parenthesesAmount = 0,
mainLineItems = [],
mainLineItemsAmount = 0,
blocks = [],
blocksAmount = 0;

var priority1ItemsAmount = 0;

var margin = 15,
bodyPadding = 10,
buttonWidth = 20;


//console.log(prefab);
//elem = prefab.cloneNode(true);
//calcContainer.appendChild(elem);
function Start() {

}

function ShowSelectionMenu(button) {
    selectionOperatorMenu.style.display = "none";
    selectionMenu.style.display = "block";
    var rect = button.getBoundingClientRect();
    selectionMenu.style.left = `${rect.left + 10 - 45}` + "px";
    selectionMenu.style.top = `${rect.top + 10 - 31.5}` + "px";
    currentButton = button;
}
function ShowSelectionOpetatorMenu(button) {
    selectionMenu.style.display = "none"
    selectionOperatorMenu.style.display = "block";
    var rect = button.getBoundingClientRect();
    selectionOperatorMenu.style.left = `${rect.left + 10 - 45}` + "px";
    selectionOperatorMenu.style.top = `${rect.top + 10 - 31.5}` + "px";
    currentButton = button;
}

function createInt() {
    selectionMenu.style.display = "none";
    var clone = intPrefab.cloneNode(true);
    parent = currentButton.parentNode;
    buttonRect = currentButton.getBoundingClientRect();
    parent.replaceChild(clone, currentButton);

    parentClass = null,
    buttonName = null;
    block = new Block(clone);

    if(currentButton.name == "upper_create_button") {
        id = parseInt(parent.id.split("_")[1])
        parentClass = fractions[id];
        parentClass.SetItemPosition(clone, true);
        parentClass.AddBlock(block, true);
        parentClass.AddSecondItemToBlock(clone, true);
        buttonName = "upper_create_button";
    }
    else if(currentButton.name == "lower_create_button") {
        id = parseInt(parent.id.split("_")[1]);
        parentClass = fractions[id];
        parentClass.SetItemPosition(clone, false);
        parentClass.AddBlock(block, false);
        parentClass.AddSecondItemToBlock(clone, false);
        buttonName = "lower_create_button";
    }
    else if (currentButton.name == "parenthesis_button") {
        id = parseInt(parent.id.split("_")[1]);
        parentClass = parenthesesArray[id];
        parentClass.SetItemPosition(clone);
        parentClass.AddBlock(block);
        parentClass.AddSecondItemToBlock(clone);
        buttonName = "parenthesis_button";
    }
    else {
        cloneRect = clone.getBoundingClientRect();
        clone.style.left = itemsWidth + "px";
        itemsWidth += cloneRect.width + margin;
        clone.style.top = `${-cloneRect.height / 2}` + "px";
        mainLineItems[mainLineItemsAmount] = clone;
        mainLineItemsAmount++;
        if(blocksAmount > 0) {
            blocks[blocksAmount - 1].secondItem = clone;
        }
        block.id = blocksAmount;
        blocks[blocksAmount] = block;
        
        blocksAmount++;
    }
    
    createOperatorButton(parent, buttonName, parentClass);
}
function createFraction() {
    selectionMenu.style.display = "none";
    clone = fractionPrefab.cloneNode(true);
    buttonRect = currentButton.getBoundingClientRect();
    parent = currentButton.parentNode;
    currentButton.parentNode.replaceChild(clone, currentButton);

    parentClass = null,
    buttonName = null;
    block = new Block(clone);

    if(currentButton.name == "upper_create_button") {
        parentClass = fractions[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone, true);
        parentClass.AddBlock(block, true);
        parentClass.AddSecondItemToBlock(clone, true);
        buttonName = "upper_create_button"; 
    }
    else if(currentButton.name == "lower_create_button") {
        parentClass = fractions[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone, false);
        parentClass.AddBlock(block, false);
        parentClass.AddSecondItemToBlock(clone, false);
        buttonName = "lower_create_button";
    }
    else if (currentButton.name == "parenthesis_button") {
        parentClass = parenthesesArray[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone);
        parentClass.AddBlock(block);
        parentClass.AddSecondItemToBlock(clone);
        buttonName = "parenthesis_button";
    }
    else {
        cloneRect = clone.getBoundingClientRect();
        clone.style.left = itemsWidth + "px";
        itemsWidth += cloneRect.width + margin;
        clone.style.top = `${-cloneRect.height / 2}` + "px";
        mainLineItems[mainLineItemsAmount] = clone;
        mainLineItemsAmount++;
        if(blocksAmount > 0) {
            blocks[blocksAmount - 1].secondItem = clone;
        }
        block.id = blocksAmount;
        blocks[blocksAmount] = block;
        blocksAmount++;
    }

    fractions[fractionsAmount] = new Fraction(clone, cloneRect);
    clone.id = "fraction_" + fractionsAmount.toString();
    fractionsAmount += 1;
    createOperatorButton(parent, buttonName, parentClass);
}
function createParenthesis() {
    selectionMenu.style.display = "none";
    parent = currentButton.parentNode;
    buttonRect = currentButton.getBoundingClientRect();
    clone = parenthesesPrefab.cloneNode(true);
    parent.replaceChild(clone, currentButton);

    parentClass = null,
    buttonName = null;
    block = new Block(clone);


    if(currentButton.name == "upper_create_button") {
        parentClass = fractions[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone, true);
        parentClass.AddBlock(block, true);
        parentClass.AddSecondItemToBlock(clone, true);
        buttonName = "upper_create_button";
    }
    else if(currentButton.name == "lower_create_button") {
        parentClass = fractions[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone, false);
        parentClass.AddBlock(block, false);
        parentClass.AddSecondItemToBlock(clone, false);
        buttonName = "lower_create_button";
    }
    else if (currentButton.name == "parenthesis_button") {
        parentClass = parenthesesArray[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone);
        parentClass.AddBlock(block);
        parentClass.AddSecondItemToBlock(clone);
        buttonName = "parenthesis_button";
    }
    else {
        cloneRect = clone.getBoundingClientRect();
        clone.style.left = itemsWidth + "px";
        itemsWidth += cloneRect.width + margin;
        clone.style.top = `${-cloneRect.height / 2}` + "px";
        mainLineItems[mainLineItemsAmount] = clone;
        mainLineItemsAmount++;
        if(blocksAmount > 0) {
            blocks[blocksAmount - 1].secondItem = clone;
        }
        block.id = blocksAmount;
        blocks[blocksAmount] = block;
        blocksAmount++;
    }
    
    parenthesisClass = new ParentHesis(clone);
    parenthesesArray[parenthesesAmount] = parenthesisClass;
    clone.id = "parentheses_" + parenthesesAmount.toString();
    parenthesesAmount++;
    createOperatorButton(parent, buttonName, parentClass);

}
function createOpetator(operator) {
    selectionOperatorMenu.style.display = "none";
    clone = operatorPrefab.cloneNode(true);
    buttonRect = currentButton.getBoundingClientRect();
    parent = currentButton.parentNode;
    parent.replaceChild(clone, currentButton);
    clone.children[0].innerHTML = operator;

    parentClass = null,
    buttonName = null;
    isPriority = false;

    if(operator == '*' || operator == '/') {
        isPriority = true;
    }

    if(currentButton.name == "upper_create_button") {
        parentClass = fractions[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone, true);
        parentClass.AddOperatorToBlock(clone.children[0].innerHTML, true);
        buttonName = "upper_create_button"; 
    }
    else if(currentButton.name == "lower_create_button") {
        parentClass = fractions[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone, false);
        parentClass.AddOperatorToBlock(clone.children[0].innerHTML, false);
        buttonName = "lower_create_button";
    }
    else if (currentButton.name == "parenthesis_button") {
        console.log(parseInt(parent.id.split("_")[1]));
        parentClass = parenthesesArray[parseInt(parent.id.split("_")[1])];
        parentClass.SetItemPosition(clone);
        parentClass.AddOperatorToBlock(clone.children[0].innerHTML, isPriority);
        buttonName = "parenthesis_button";
    }
    else {
        cloneRect = clone.getBoundingClientRect();
        clone.style.left = itemsWidth + "px";
        itemsWidth += cloneRect.width + margin;
        clone.style.top = `${-cloneRect.height / 2}` + "px";
        mainLineItems[mainLineItemsAmount] = clone;
        mainLineItemsAmount++;
        blocks[blocksAmount - 1].operator = clone.children[0].innerHTML;
        if(isPriority) {
            priority1ItemsAmount++;
        }
    }


    createButton(parent, buttonName, parentClass);
}
function createButton(parent, buttonName, parentClass) {
    clone = createButtonPrefab.cloneNode(true);
    parent.appendChild(clone);
    cloneRect = clone.getBoundingClientRect();
    if(buttonName == null) {
        clone.style.left = itemsWidth + "px";
        clone.style.top = `${-cloneRect.height / 2}` + "px";
        mainLineItems[mainLineItemsAmount] = clone;
    }
    else if(buttonName == "parenthesis_button") {
        parentClass.SetItemPosition(clone);
    }
    else {
        if(buttonName == "upper_create_button") {
            parentClass.SetItemPosition(clone, true);
        }
        else {
            parentClass.SetItemPosition(clone, false); 
        }
    }
    clone.name = buttonName;
    
}
function createOperatorButton(parent, buttonName, parentClass) {
    clone = createOperatorButtonPrefab.cloneNode(true);
    parent.appendChild(clone);
    cloneRect = clone.getBoundingClientRect();
    console.log(buttonName);
    if(buttonName == null) {
        clone.style.left = itemsWidth + "px";
        clone.style.top = `${-cloneRect.height / 2}` + "px";
        mainLineItems[mainLineItemsAmount] = clone;
    }
    else if (buttonName == "parenthesis_button"){
        parentClass.SetItemPosition(clone);
    }
    else {
        if(buttonName == "upper_create_button") {
            parentClass.SetItemPosition(clone, true);
        }
        else {
            parentClass.SetItemPosition(clone, false); 
        }
    }
    clone.name = buttonName;
}

function RecalculatePositions() {
    itemsWidth = 0;
    for(let i = 0; i <= mainLineItemsAmount; i++){
        item = mainLineItems[i];
        item.style.left = itemsWidth + "px";
        cloneRect = item.getBoundingClientRect();
        itemsWidth += cloneRect.width + margin;
    }
    itemsWidth -= buttonWidth + margin;
}
function Calculate() {/*
    if(blocks[blocksAmount - 1].secondItem == null ) {
        blocksAmount--;
        blocks[blocksAmount] = null;
    }*/
    for (let i = 0; i < blocksAmount; i++) {
        block = blocks[i];
        if(i + 1 < blocksAmount) {
            nextBlock = blocks[i + 1];
            if(block.operator == "*" || block.operator == "/") {
                nextBlock.firstItem = block.Calculate();
            }
            else {
                if(nextBlock.operator == "*" || nextBlock.operator == "/") {
                    blockId = i;
                    var result = 0;
                    isFirstCycle = true;
                    do {
                        if(isFirstCycle) {
                            i++;
                            currentBlock = blocks[i];
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
                        resultField.value = block.Calculate();
                    }
                    
                }
                else {
                    nextBlock.firstItem = block.Calculate();
                }
            }
            
        }
        else {
            resultField.value = block.Calculate();;
        }

    }















    /*if(blocks[blocksAmount - 1].secondItem == null) {
        blocksAmount--;
        blocks[blocksAmount] = null;
    }
    priorityOrder = [];
    priority1Pos = 0;
    priority2Pos = priority1ItemsAmount;

    for(let i = 0; i < blocksAmount; i++) {
        block = blocks[i];
        if (block.operator == "*" || block.operator == "/") {
            priorityOrder[priority1Pos] = block;
            priority1Pos++;
        }
        else {
            priorityOrder[priority2Pos] = block;
            priority2Pos++;
        }
    }
    for (let i = 0; i < blocksAmount; i++) {
        block = priorityOrder[i];
        var blockResult = block.Calculate();
        id = block.id;

        if (id < blocksAmount - 1) {
            blocks[id + 1].firstItem = blockResult;     
        }
        if(i < priority1ItemsAmount) {
            if(id > 0) {
                blocks[id - 1].secondItem = blockResult;
            }
        }
        else {
            if(i < blocksAmount - 1) {
                priorityOrder[i + 1].firstItem = blockResult;

            }
        }
        if(i == blocksAmount - 1) {
            console.log("result: " + blockResult);
        }

    }
    console.log(priorityOrder);*/
}