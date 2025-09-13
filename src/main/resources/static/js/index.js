var container = document.getElementById("container");

/**
 * 控制模态框状态
 */
{
    $('#loginBut').click(function () {
        $('#loginModalBox').modal('show')
    })
    $('#regeditBut').click(function () {
        $('#regeditModalBox').modal('show')
    })
    $('#messageBut').click(function () {
        $('#messageModalBox').modal('show')
    })
    $('.btn-secondary').click(function () {
        $('.form-control').val('')
        $('#loginModalBox').modal('hide')
    })
    $('.close').click(function () {
        $('.form-control').val('')
        $('#loginModalBox').modal('hide')
    })
}

/**
 * 创建一条评论
 * @param nickname      昵称
 * @param words         消息队列
 * @param update_date   创建时间
 */
function createMessage(nickname, update_date, words) {
    var div = document.createElement("div");
    div.className = "cp";
    div.innerHTML = `
            <div class="user-info">
                <span class="c-nickname">${nickname}</span>
                <span class="c-time">${update_date}</span>
            </div>
            <p class="item-cp">${words}</p>
        `;
    if (container.firstChild) {
        container.insertBefore(div, container.firstChild);
    } else {
        container.appendChild(div);
    }
}

var messages = [
    // {
    //     nickname: '下回小xin点吧',
    //     update_date: formatDate(),
    //     words: '你所见即是我，好与坏我都不反驳，我所爱即使你，好与坏我都能接受',
    // },
    // {
    //     nickname: '已读不回专业户',
    //     update_date: formatDate(),
    //     words: '总觉得你放不下一个人，那未必是爱，那只是执着与回忆',
    // },
    // {
    //     nickname: '懒羊羊大将军',
    //     update_date: formatDate(),
    //     words: '你大概不知道，我曾那么努力的想在你的世界里存在的久一点，再久一点',
    // },
]

function createInitPapers() {
    console.log($.ajax())
    $.ajax({
        type: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        dateType: 'json',
        url: "/msgall",
        success: function (messageAll) {
            for (let msg of messageAll) {
                // arr.push(msg.message)
                createMessage(msg.nickname, msg.update_date, msg.message);
            }
        },
        error: function (err) {
            console.log(err, '有异常');
        }
    })
    // for (let i = messages.length - 1; i >= 0; i--) {
    //     createMessage(messages[i].nickname, messages[i].update_date, messages[i].words)
    // }
}

/**
 * 点击按钮发布新的评论
 */
$('#sendMessageBut').click(function () {
    var nickname = $('#u-nickname').html() || null;
    console.log(nickname)
    var strDate = formatDate()
    var message = $('#message-text').val() || null;

    if (message && nickname) {
        var param = {nickname, message}
        console.log(param)
        //发送请求添加消息
        $.ajax({
            type: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            },
            dateType: 'json',
            data: JSON.stringify(param),
            url: "/message",
            success: function (msg) {
                alert(msg)
                if (nickname && msg) {
                    createMessage(nickname, strDate, message)
                    $('.form-control').val('')
                }
            },
            error: function (err) {
                console.log(err, '有异常');
            }
        })

    }
    messages.push({
        nickname: nickname,
        update_date: strDate,
        words: message,
    })

    $('.form-control').val('')
    $('#messageModalBox').modal('hide')
})

/**
 * 用来做日期时间格式化
 */
function formatDate() {
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}

createInitPapers()

/**
 * 登录请求
 */
$('#userLoginBut').click(function () {
    var name = $('#login_user_name').val() || null;
    var password = $('#login_user_password').val() || null;
    var param = {name, password};
    if (name && password) {
        $.ajax({
            type: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            },
            dateType: 'json',
            data: JSON.stringify(param),
            url: "login",
            success: function (msg) {
                console.log(msg.result.nickname, typeof (msg.result.nickname))
                // console.log(msg.messageAll)
                // var messageAll = msg.messageAll

                if (msg.result.nickname !== undefined) {
                    setTimeout(function () {
                        location.href = '/index.do';
                        console.log('登录成功')
                        $('#login_user_name').val('')
                        $('#login_user_password').val('')
                        $('#loginModalBox').modal('hide')
                        // for (let msg of messageAll) {
                        //     createWish(msg.message);
                        // }
                    }, 1000)
                } else {
                    $(".form-control").val('')
                }
            },
            error: function (err) {
                console.log(err, '有异常');
            }
        })
    } else {
        console.log('账号or密码为null');
    }
})

/**
 * 注册请求
 */
$('#userRedegitBut').click(function () {
    var nickname = $('#regedit_user_nickname').val() || null;
    var name = $('#regedit_user_name').val() || null;
    var password = $('#regedit_user_password').val() || null;
    var param = {nickname, name, password};
    console.log(param)
    if (nickname && name && password) {
        $.ajax({
            type: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            },
            dateType: 'json',
            data: JSON.stringify(param),
            url: "regedit",
            success: function (msg) {
                alert(msg)
                $('#regedit_user_nickname').val('')
                $('#regedit_user_name').val('')
                $('#regedit_user_password').val('')
                $('#regeditModalBox').modal('hide')
            },
            error: function (err) {
                console.log(err, '有异常');
            }
        })
    } else {
        console.log('账号or密码为null');
    }
})