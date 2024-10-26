/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'Euphoria'
function getPagesRendering() {
    axios({
        url: 'https://hmajax.itheima.net/api/settings',
        params: {
            creator
        }
    }).then(result => {
        const datas = result.data.data;
        Object.keys(datas).forEach(key => {
            if (key === 'avatar')
                document.querySelector('.prew').src = datas[key];
            else if (key === 'gender') {
                const genderAll = document.querySelectorAll('.gender');
                const genderNum = datas[key];
                genderAll[genderNum].checked = true;
            }
            else {
                document.querySelector(`.${key}`).value = datas[key];
            }
        })
    })
}
getPagesRendering();

const upload = document.querySelector('.upload');
upload.addEventListener('change', function (e) {
    const imgElem = e.target.files[0];
    const formdata = new FormData;
    formdata.append('avatar', imgElem);
    formdata.append('creator', creator);

    axios({
        url: 'https://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: formdata
    }).then(result => {
        document.querySelector('.prew').src = result.data.data.avatar;
    });
});


document.querySelector('.submit').addEventListener('click', function () {
    const form = document.querySelector('.user-form');
    const formVals = serialize(form, { hash: true, empty: true });
    console.log(formVals);
    const email = formVals.email;
    const nickname = formVals.nickname;
    const gender = parseInt(formVals.gender);
    console.log(gender);
    const desc = formVals.desc;
    axios({
        url: 'https://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: {
            desc,
            email,
            gender,
            nickname,
            creator
        }
    }).then(() => {
        const Origtoast = document.querySelector('.my-toast');
        const toast = new bootstrap.Toast(Origtoast);
        toast.show();
        getPagesRendering();
    });
})