$(function () {
    var interval;
    var activeModel;
    var timer;
    var result = $('#tetris').initTable();
    var statusArray = new Array(0);
    var cx = 0;
    var cy = 0;
    Main();
    function getModelType() {
        var type = (Math.floor(Math.random() * 20) + 1) % 7;
        var newModel = new Array(4);
        switch (type) {
            case 0:
                newModel[0] = { x: 5, y: 0 }
                newModel[1] = { x: 5, y: 1 }
                newModel[2] = { x: 5, y: 2 }
                newModel[3] = { x: 5, y: 3 }
                return newModel;
            case 1: 
                newModel[0] = { x: 5, y: 0 }
                newModel[1] = { x: 5, y: 1 }
                newModel[2] = { x: 6, y: 0 }
                newModel[3] = { x: 6, y: 1 }
                return newModel;
            case 2:
                newModel[0] = { x: 5, y: 0 }
                newModel[1] = { x: 4, y: 1 }
                newModel[2] = { x: 5, y: 1 }
                newModel[3] = { x: 6, y: 1 }
                return newModel;
            case 3:
                newModel[0] = { x: 4, y: 0 }
                newModel[1] = { x: 4, y: 1 }
                newModel[2] = { x: 5, y: 1 }
                newModel[3] = { x: 6, y: 1 }
                return newModel;
            case 4:
                newModel[0] = { x: 4, y: 1 }
                newModel[1] = { x: 5, y: 1 }
                newModel[2] = { x: 6, y: 1 }
                newModel[3] = { x: 6, y: 0 }
                return newModel;
            case 5:
                newModel[0] = { x: 4, y: 1 }
                newModel[1] = { x: 5, y: 1 }
                newModel[2] = { x: 5, y: 0 }
                newModel[3] = { x: 6, y: 0 }
                return newModel;
            case 6:
                newModel[0] = { x: 4, y: 0 }
                newModel[1] = { x: 5, y: 0 }
                newModel[2] = { x: 5, y: 1 }
                newModel[3] = { x: 6, y: 1 }
                return newModel;
        }
    }
    //var currentModel = getModelType(1);
    function paintModel() {
        $('td').removeClass('selected');
        for (var i = 0; i < 4; i++) {
            $($.format('td[data-x={0}][data-y={1}]', activeModel[i].x, activeModel[i].y)).addClass('selected');
        }
    }
    function upButtonClick() {
         console.log('test')

        var copyModel = copy();
        for (var i = 0; i < 4; i++) {
            var copyx=activeModel[i].x;
            activeModel[i].x = cx + cy- activeModel[i].y;
            activeModel[i].y =  cy + copyx -cx ;
            console.log($.format('{2}::x:{0},y:{1},', activeModel[i].x, activeModel[i].y, i))
        }
        for (var j = 0; i < 4; j++) {
            if (!checkModel(activeModel[i].x, activeModel[i].y)) {
                activeModel = copyModel;
                return;
            }
        }
        console.log($.format('cx:{0},cy:{1},', cx, cy))
        paintModel();
        return;
    }
    function leftButtonClick() {
        for (var i = 0; i < 4; i++) {
            if (!checkLeftMove(activeModel[i].x)) {
                return;
            }
        }
        for (var i = 0; i < 4; i++) {
            activeModel[i].x = activeModel[i].x - 1;
        }
        paintModel()
    }
    function rightButtonClick() {
        for (var i = 0; i < 4; i++) {
            if (!checkRightMove(activeModel[i].x)) {
                return;
            }
        }
        for (var i = 0; i < 4; i++) {
            activeModel[i].x = activeModel[i].x + 1;
        }
        paintModel()
    }
    function bottomButtonClick() {
        clearInterval(interval);
        interval = setInterval(function () {
            moveDown()
        }, 100);
    }
    function moveDown() {
        if (checkBottom()) {
            for (var i = 0; i < 4; i++) {
                activeModel[i].y = activeModel[i].y + 1;
            }
            cy = cy + 1;
            paintModel();
        }
        else {
            $('.selected').addClass('atbottom')
            $('td').removeClass('selected');
            clearInterval(interval);
            Main();
        }
    }
    function checkModel(x, y) {
        if (x > result.col - 1 || y > result.cell - 1)
            return false;
        else
            return true;
    }
    function checkLeftMove(x) {
        if (x == 0)
            return false;
        else {
            cx = cx - 1;
            return true;
        }

    }
    function checkRightMove(x) {
        if (x == result.col - 1)
            return false;
        else {
            cx = cx + 1;
            return true;
        }

    }

    function checkBottom() {
        for (var i = 0; i < 4; i++) {
            if (activeModel[i].y == result.cell - 1 || checkStatus(activeModel[i])) {
                for (var j = 0; j < 4; j++) {
                    statusArray.push(activeModel[j]);

                }
                return false;
            }
        }
        return true;
    }
    function checkStatus(value) {
        // console.log($.inArray(value, statusArray));
        for (var i = 0; i < statusArray.length; i++) {
            if (statusArray[i].x == value.x && statusArray[i].y == value.y + 1)
                return true
        }
        return false;
    }
    function buttonClick(event) {
        switch (event.which) {
            case 37:
                leftButtonClick();
                break;
            case 38:
                upButtonClick();
                break;
            case 39:
                rightButtonClick();
                break;
            case 40:
                bottomButtonClick();
                break;
            default: break;
        }
    }
    function copy() {
        var copyArray = new Array(4);
        for (var i = 0; i < 4; i++) {
            copyArray[i] = { x: 0, y: 0 };
        }
        for (var j = 0; j < 4; j++) {
            copyArray[j].x = activeModel[j].x;
            copyArray[j].y = activeModel[j].y;
        }
        return copyArray;
    }
    function Main() {
        $(document).unbind('keyup')
        timer = 1000;
        activeModel = getModelType();
        cx = Math.round((activeModel[0].x + activeModel[1].x + activeModel[2].x + activeModel[3].x) / 4);
        cy = Math.round((activeModel[0].y + activeModel[1].y + activeModel[2].y + activeModel[3].y) / 4);
        paintModel();
         interval = setInterval(function () {
             moveDown()
         }, timer);
        $(document).bind('keyup',buttonClick)
    }
})

