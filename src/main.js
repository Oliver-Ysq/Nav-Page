const $addBtn = $('.addBtn')
const $siteList = $('.siteList')
//使用localStorage防止数据丢失
const hashObj = JSON.parse(localStorage.getItem('info'))
const hashMap = hashObj || [{
        logo: 'B',
        url: 'https://bilibili.com'
    },
    {
        logo: 'T',
        url: 'https://taobao.com'
    },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.addBtn)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
            <li>
            <a href="${node.url}">
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li> `).insertBefore($addBtn)
        $li.on('click', '.close', (e) => {
            e.preventDefault() //preventDefault()阻止a标签跳转，但不阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addBtn')
    .on('click', () => {
        let url = window.prompt('你想添加的网址是啥？')
        if (url.indexOf('https') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: (simplifyUrl(url)[0]).toUpperCase(),
            url: url
        })
        render()
    })

// 离开页面时记录当前数据
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    console.log(string)
    localStorage.setItem('info', string) //key:value形式
}