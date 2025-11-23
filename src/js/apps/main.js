let currentAvatarKey = 'tone';
const currentAvatar = {
  tone: 'tone_300',
  hair_type: 'hair_short3',
  hair_color: 'black',
  clothes: 'hoodie',
  accessories: 'acc_none',
};

const avatarMenu = document.querySelector('#avatar-menu');
const avatarSelectors = document.querySelectorAll('.avatar-selector');
const avatarMenuItems = avatarMenu.querySelectorAll('.avatar-menu-item');
const avatarImages = document.querySelectorAll('.avatar-image');
const avatar = document.querySelector('#avatar');
const saveButton = document.querySelector('#save-button');

avatarMenu.addEventListener('click', handleAvatarMenuClick);
for (const avatarSelector of avatarSelectors) {
  avatarSelector.addEventListener('click', handleAvatarSelectorClick);
}
saveButton.addEventListener('click', handleSaveClick);

function updateAvatarMenu(avatarKey) {
  for (const avatarSelector of avatarSelectors) {
    avatarSelector.classList.toggle(
      'active',
      avatarSelector.dataset.avatarKey == avatarKey
    );
  }

  for (const avatarMenuItem of avatarMenuItems) {
    avatarMenuItem.classList.toggle(
      'active',
      avatarMenuItem.dataset.avatarKey === avatarKey
    );
  }
}

function updateAvatar(avatarKey, avatarValue) {
  currentAvatar[avatarKey] = avatarValue;

  let imageKey = avatarKey;
  let filename = currentAvatar[avatarKey];
  if (avatarKey.indexOf('hair') === 0) {
    imageKey = 'hair';
    filename = `${currentAvatar.hair_type}-${currentAvatar.hair_color}`;
  }

  for (const avatarImage of avatarImages) {
    if (avatarImage.dataset.imageKey === imageKey) {
      avatarImage.setAttribute('src', `./images/avatar/${filename}.svg`);
      break;
    }
  }
}

function handleAvatarMenuClick(e) {
  const nextAvatarKey = e.target.dataset.avatarKey;
  if (!nextAvatarKey) return;
  currentAvatarKey = nextAvatarKey;
  updateAvatarMenu(currentAvatarKey);
}

function handleAvatarSelectorClick(e) {
  const nextAvatarValue = e.target.dataset.avatarValue;
  if (!nextAvatarValue) return;
  updateAvatar(currentAvatarKey, nextAvatarValue);
}

function handleSaveClick() {
  html2canvas(avatar).then(function (canvas) {
    // <a> 요소를 만들고, 이미지 데이터를 변환해서 주소로 지정한다
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'avatar.png';
    // <a> 태그를 자바스크립트로 클릭한다
    link.click();
  });
}

