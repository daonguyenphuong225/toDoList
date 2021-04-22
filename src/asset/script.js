$(document).ready(function () {
    $('.post').click(() =>{
        let content = $('input[name="content"]').val()
        if(content.length == 0){
            alert('Hãy nhập nội dung')
        }else{
            let contentAppend = `
            <div class="parent">
                <div>${content}</div>
                <button class="fixContent">Update</button>
                <button class="deleteContent">Delete</button>
                <button class="moveToDoing">MoveToDoing</button>     
            </div>
            `
            fetch('/api/task', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    status: content
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    $('.content').append(contentAppend)
                    $('input[name="content"]').val('')
                    $('input[name="content"]').focus()
                });
        }
            
    });
    
    $('body').on('click','.fixContent', function(){
        let content1 = $(this).siblings('div:first-child').html()
        $(this).siblings()[1].remove()
        $(this).siblings()[1].remove()
        $(this).siblings().replaceWith('<input class = "updateContent1" type="text"> ');
        $('.updateContent1').val(content1)
        $(this).replaceWith('<button class="done">Done</button>');
    })
    
    $('body').on('click','.deleteContent', function(){
        $(this).parent().remove();
    })
    
    $('body').on('click','.done', function(){
        let newData = $(this).siblings().val();
        let replaceData = `
        <div class"parent">
            <div name="box" class="box">${newData}</div>
            <button class="fixContent">Update</button>
            <button class="deleteContent">Delete</button>
            <button class="moveToDoing">MoveToDoing</button>     
        </div>
    `
        $(this).siblings().replaceWith(replaceData);
        $(this).remove()
    })
    
    $('body').on('click','.moveToDoing', function(){
        let copyContent1 = $(this).siblings().html();
        let contentAppend1 = `
        <div class="parent">
            <div>${copyContent1}</div>
            <button class="fixContent">Update</button>
            <button class="deleteContent">Delete</button>
            <button class="moveToDone">MoveToDone</button>     
        </div>
        `
        $('.doing').append(contentAppend1)
        $(this).parent().remove();
    
    })
    
    $('body').on('click','.moveToDone', function(){
        let copyContent2 = $(this).siblings().html();
        let contentAppend2 = `
        <div class="parent">
            <div>${copyContent2}</div>
        </div>
        `
        $('.done').append(contentAppend2)
        $(this).parent().remove();
    })
    

});


    //cho toàn bộ fetch vào jquey button.click
    // tương tự làm với nút GET bỏ qua được headẻ vào body