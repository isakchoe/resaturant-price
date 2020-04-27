$(document).ready(function () {
    // index.html 로드가 완료되면 자동으로 show_star() 함수를 호출합니다.
    show_di();

    let $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = 1000,
        max = 20000,
        from = 0,
        to = 0;

    console.log($range)

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        from: 200,
        to: 800,
        onStart: updateInputs,
        onChange: updateInputs
    });
    instance = $range.data("ionRangeSlider");


    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    };


    $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });
});


function show_di() {

    $.ajax({
            type: "GET",
            url: "/api/list",
            data: {},
            success: function (response) {

                let dinings = response['di_list'];


                for (let i = 0; i < dinings.length; i++) {

                    let url = dinings[i]['img_url'];
                    let price = dinings[i]['price'];
                    let menu = dinings[i]['menu'];
                    let name = dinings[i]['name'];


                    let temp =
                        '<div class="col-md-4">' +
                        '    <div class="card mb-4 shadow-sm">' +
                        '        <img src=' + '"' + url + '"' + 'height="225" width="100%"/>\n' +
                        '        <div class="card-body">\n' +
                        '            <h4 class="card-text">' + name + '</h4>' +
                        '            <div class="card-text">' + menu + '</div>' +
                        '            <div class="card-text">' + price + '</div>' +
                        '            <div class="d-flex justify-content-between align-items-center">\n' +
                        '                <div class="btn-group">\n' +
                        '                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>\n' +
                        '                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '    </div>\n' +
                        '</div>\n'


                    $('#list').append(temp);
                }


            }
        }
    );
}

function serch() {

    let first = $('#first').val();
    let last = $('#last').val();

    $.ajax({
        type: 'POST',
        url: '/api/post',
        data: {
            'first': first,
            'last': last
        },
        success: function (response) {

            $('#list').empty();

            let filterDi = response['result'];

            for (let i = 0; i < filterDi.length; i++) {

                let url = filterDi[i]['img_url'];
                let price = filterDi[i]['price'];
                let menu = filterDi[i]['menu'];
                let name = filterDi[i]['name'];


                let temp =
                    '<div class="col-md-4">' +
                    '    <div class="card mb-4 shadow-sm">' +
                    '        <img src=' + '"' + url + '"' + 'height="225" width="100%"/>\n' +
                    '        <div class="card-body">\n' +
                    '            <h4 class="card-text">' + name + '</h4>' +
                    '            <div class="card-text">' + menu + '</div>' +
                    '            <div class="card-text">' + price + '</div>' +
                    '            <div class="d-flex justify-content-between align-items-center">\n' +
                    '                <div class="btn-group">\n' +
                    '                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>\n' +
                    '                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>\n'


                $('#list').append(temp);


            }
            ;

            alert('필터링 되었습니다!')


        }
    })

}
