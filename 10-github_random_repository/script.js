const searchRepositoryButton = document.getElementById('searchRepositoryButton');
const dropDown = document.getElementById('dropDown');

const states = document.querySelector('.states');

const repo = document.querySelector('.repo');
const repoName = document.getElementById('repoName');
const repoDescription = document.getElementById('repoDescription');
const repoLanguage = document.getElementById('repoLanguage');
const repoStars = document.getElementById('repoStars');
const repoForks = document.getElementById('repoForks');
const repoOpenIssues = document.getElementById('repoOpenIssues');

document.addEventListener('DOMContentLoaded', () => {
    populateOptions();

    searchRepositoryButton.addEventListener('click', fetchRandomRepository);    
});

async function populateOptions() {
    try {
        const response = await fetch ('languages.json');
        if (!response.ok) {
            throw new Error('Fetching Languages Error');
        }

        const data = await response.json();
        data.forEach(language => {
            const option = document.createElement('option');
            option.textContent = language.title;
            option.value = language.value;
            dropDown.appendChild(option);
        });

    }
    catch (error) {
        console.error(error);
    }
}

async function fetchRandomRepository() {
    repo.style.display = 'none';
    states.style.display = 'block';
    states.backgroundColor = '#e9ecef';
    states.innerText = 'Loading, please wait...';
    searchRepositoryButton.style.backgroundColor = "black";
    searchRepositoryButton.innerText = "Search Repository";
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${dropDown.value.toLowerCase()};`)

        if (!response.ok) {
            throw new Error('Fetch Error');
        }

        const data = await response.json();
        const repositories = data.items;
        let randomRepository = repositories[Math.floor(Math.random() * repositories.length)];

        states.style.display = 'none';
        repo.style.display = 'flex';
        repoName.innerText = randomRepository.name;
        repoDescription.innerText = randomRepository.description;
        repoLanguage.innerText = randomRepository.language;
        repoStars.innerText = '⭐ ' + randomRepository.stargazers_count;
        repoForks.innerText = '🍴 ' + randomRepository.forks_count;
        repoOpenIssues.innerText = '🐛 ' + randomRepository.open_issues_count;
    } 
    catch (error) {
        states.style.display = 'block';
        states.backgroundColor = '#ffc9c9';
        states.innerText = 'Error Fetching Repositories';
        searchRepositoryButton.style.backgroundColor = "#e03131";
        searchRepositoryButton.innerText = "Click to Retry";
        console.error(error);
    }
}
