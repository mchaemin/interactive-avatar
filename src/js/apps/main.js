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
      avatarImage.setAttribute('src', `../img/avatar/${filename}.svg`);
      break;
    }
  }
}

function handleAvatarMenuClick(e) {
  const nextItem = e.target.closest('.avatar-menu-item');
  if (!nextItem) return;
  const nextAvatarKey = nextItem.dataset.avatarKey;
  if (!nextAvatarKey) return;
  currentAvatarKey = nextAvatarKey;
  updateAvatarMenu(currentAvatarKey);
}

function handleAvatarSelectorClick(e) {
  const selectorItem = e.target.closest('.avatar-selector-item');
  if (!selectorItem) return;

  const selectorList = selectorItem.closest('.avatar-selector');
  if (!selectorList || !selectorList.classList.contains('active')) return;

  const nextAvatarValue = selectorItem.dataset.avatarValue;
  if (!nextAvatarValue) return;

  updateAvatar(currentAvatarKey, nextAvatarValue);
}

function handleSaveClick() {
  const target = document.querySelector('.avatar');
  if (!target) return;

  const saveDataUrl = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'avatar.png';
    link.click();
  };

  if (typeof domtoimage !== 'undefined') {
    domtoimage
      .toPng(target, { bgcolor: '#ffffff', cacheBust: true })
      .then(saveDataUrl)
      .catch((err) => {
        console.error('domtoimage failed, fallback to html2canvas', err);
        if (typeof html2canvas !== 'undefined') {
          html2canvas(target, { useCORS: true, backgroundColor: '#ffffff' }).then(
            (canvas) => saveDataUrl(canvas.toDataURL('image/png'))
          );
        }
      });
  } else if (typeof html2canvas !== 'undefined') {
    html2canvas(target, { useCORS: true, backgroundColor: '#ffffff' }).then(
      (canvas) => saveDataUrl(canvas.toDataURL('image/png'))
    );
  } else {
    console.error('No capture library available');
  }
}
