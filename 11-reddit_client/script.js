function toggleModal() {
    const modal = document.getElementById('modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    else {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
    document.getElementById('subredditInput').value = '';
}

function toggleLoading() {
    const modalContent = document.querySelector('.modal-content');
    const modalLoading = document.querySelector('.modal-loading');

    if (modalContent.style.display !== 'none') {    
        modalContent.style.display = 'none';
        modalLoading.style.display = 'flex';
    }
    else {
        modalLoading.style.display = 'none';
        modalContent.style.display = 'flex';
    }
}

function resetErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.display ='none';
    errorMessage.textContent = '';
    const subredditInput = document.getElementById('subredditInput');
    subredditInput.classList.remove('error');
}

function showErrorMessage(message) {
    const subredditInput = document.getElementById('subredditInput');
    subredditInput.classList.add('error');
    
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display ='block';
}

document.addEventListener('DOMContentLoaded', () => {
    // OPEN MODAL
    const addNew = document.getElementById('addNewSubredditButton');
    addNew.addEventListener('click', () => {
        toggleModal();
        resetErrorMessage();
    });

    // CLOSE MODAL
    const closeModal = document.querySelector('.modal-close');
    closeModal.addEventListener('click', () => {
        toggleModal();
        resetErrorMessage();
    });
    // CLOSE MODAL ON OUTSIDE CLICK
    const modalContainer = document.querySelector('.modal-container');
    const modalContent = document.querySelector('.modal-content');
    modalContainer.addEventListener('click', function(event) {
        if (modal.classList.contains('flex') && !modalContent.contains(event.target)) {
            toggleModal();
            resetErrorMessage();
        }
    });

    // ADD NEW SUBREDDIT
    const addSubredditButton = document.getElementById('addSubredditButton');
    const subredditInput = document.getElementById('subredditInput');

    function handleSubredditSubmit() {
        resetErrorMessage();
        const value = subredditInput.value.trim();
        if (value) {
            getSubredditJson(value);
        } else {
            showErrorMessage('Please enter a subreddit name.');
        }
    }

    addSubredditButton.addEventListener('click', handleSubredditSubmit);

    subredditInput.addEventListener('keydown', (e) => {
        resetErrorMessage();
        if (e.key === 'Enter') handleSubredditSubmit();
    });

});

async function getSubredditJson(subredditName) {
    toggleLoading(); // Turn on loading spinner

    try {
        const response = await fetch(`https://www.reddit.com/r/${subredditName}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const listOfPosts = data.data.children;
        
        toggleLoading(); // Turn off loading spinner
        toggleModal();

        createSubredditPanel(subredditName, listOfPosts);
    }
    catch (error) {
        toggleLoading(); // Turn off loading spinner
        showErrorMessage('Error fetching subreddit data. Please check the subreddit name and try again.');
        console.error('Error fetching subreddit data:', error);
    }
}

function createSubredditPanel(subredditName, postList) {
    const container = document.querySelector('.parent-container');
    const buttonContainer = document.getElementById('addNewContainer');

    // Create Parent Div
    const subredditPanel = document.createElement('div');
    subredditPanel.classList.add('subreddit-panel');

    // Create Title
    const subredditHeader = document.createElement('div');
    subredditHeader.classList.add('subreddit-header');
    
    const subredditTitle = document.createElement('p');
    subredditTitle.classList.add('subreddit-title');
    subredditTitle.innerHTML = '/r/' + subredditName;

    // 3-dot button
    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('menu-wrapper');

    const menuButton = document.createElement('button');
    menuButton.classList.add('dots-btn');
    menuButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="5" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="12" cy="19" r="2"/>
    </svg>
    `;

    // Popup menu
    const popupMenu = document.createElement('div');
    popupMenu.classList.add('popup-menu');
    popupMenu.style.display = 'none';

    const refreshOption = document.createElement('div');
    refreshOption.textContent = 'Refresh';
    refreshOption.classList.add('popup-option');

    refreshOption.addEventListener('click', () => {
        renderPosts();
    });

    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Delete';
    deleteOption.classList.add('popup-option');

    deleteOption.addEventListener('click', () => {
        subredditPanel.remove();
    });

    // Append popup options
    popupMenu.appendChild(refreshOption);
    popupMenu.appendChild(deleteOption);

    // Append button and popup
    menuWrapper.appendChild(menuButton);
    menuWrapper.appendChild(popupMenu);

    // Final structure
    subredditHeader.appendChild(subredditTitle);
    subredditHeader.appendChild(menuWrapper);
    subredditPanel.appendChild(subredditHeader);

    // Toggle popup on button click
    menuButton.addEventListener('click', (e) => {
        popupMenu.style.display = popupMenu.style.display === 'flex' ? 'none' : 'flex';
        e.stopPropagation();
    });
    
    // Hide popup when clicking outside
    document.addEventListener('click', () => {
        popupMenu.style.display = 'none';
    });

    // Create Post List
    const subredditPostList = document.createElement('ul');
    subredditPostList.classList.add('subreddit-post-list');
    subredditPanel.appendChild(subredditPostList);

    function renderPosts() {
        subredditPostList.innerHTML = '';

        // Create individual Posts
        postList.forEach(post => {
            const subredditPost = document.createElement('li');
            subredditPost.classList.add('subreddit-post');

            // Votes
            const subredditVotes = document.createElement('span');
            subredditVotes.classList.add('subreddit-votes');
            subredditVotes.innerHTML = post.data.score;
            if (post.data.score < 0 ) {
                subredditVotes.classList.add('negative-votes');
            } else if (post.data.score > 0) {
                subredditVotes.classList.add('positive-votes');
            }
            subredditPost.appendChild(subredditVotes);

            // Text w Link
            const subredditPostLink = document.createElement('a');
            subredditPostLink.classList.add('subreddit-post-link');
            subredditPostLink.href = post.data.url;
            subredditPostLink.target = '_blank';
            subredditPostLink.innerHTML = post.data.title;
            subredditPost.appendChild(subredditPostLink);

            subredditPostList.appendChild(subredditPost);
        });
    }
    renderPosts();
    container.insertBefore(subredditPanel, buttonContainer);
}