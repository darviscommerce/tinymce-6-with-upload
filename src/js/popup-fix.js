// When popup is not clickable
$(document).on('focusin', function(e) {
        if ($(e.target).closest(".tox-textfield").length)
            e.stopImmediatePropagation();
});
