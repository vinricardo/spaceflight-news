{
    
const api = `https://api.spaceflightnewsapi.net/v3`
const endpoints =  {
    articles: () => `${api}/articles`,
    reports: () => `${api}/reports`
}


const articles$ = fetch(endpoints.articles()).then(res => res.json())
const reports$ = fetch(endpoints.reports()).then(res=> res.json())

function getArticles() {
    articles$.then(res => {
        var articles = [
            {art: res[0], position: 'top'},
            {art: res[1], position: 'second'},
            {art: res[2], position: 'third'},
            {art: res[3], position: 'fourth'},
            {art: res[4], position: 'fifth'},
            {art: res[5], position: 'sixth'},
        ]

        articles.forEach(_ => setTitleAndSubtitleArticle(_.art,_.position))
        detailsFirstArticle(res[0]);
        setImage('#third-article-img', res[2].imageUrl)
        setImage('#fourth-article-img', res[3].imageUrl)
        setImage('#fifth-article-img', res[4].imageUrl)
    })
}

function getReports(){
    reports$.then(res => {
        let subtitleReport = document.querySelector('#seventh-article-subtitle');
        let dateReport =  document.querySelector('#publish-date-report');
        subtitleReport.innerHTML =  res[0].summary;
        dateReport.innerHTML = new Date(res[0].publishedAt).toLocaleDateString();
    })
}

function detailsFirstArticle(article) {
    let ownerCompany = document.querySelector('#company')
    let ownerPublishDate = document.querySelector('#publish-date')
    ownerCompany.innerText = article.newsSite
    ownerPublishDate.innerText = article.publishedAt.split('T')[0]
}

function setTitleAndSubtitleArticle(article, position){
    let titleArticle = document.querySelector(`#${position}-article-title`);
    let subtitleArticle = document.querySelector(`#${position}-article-subtitle`);
    titleArticle.innerText = article.title
    position == 'fourth' || position == 'fifth' ? subtitleArticle.innerText =  'By ' + article.newsSite : subtitleArticle.innerText = article.summary
}

function setImage(id,imageUrl){
    let imgTag = document.querySelector(id);
    imgTag.setAttribute('src', imageUrl)
}

getArticles();
getReports();
}
