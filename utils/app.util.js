import { t } from "i18next";

export const getLipsyncProviderMaskedLabel = (lipsyncProvider, key) => {
  if(!lipsyncProvider) {
    lipsyncProvider = 'LPS001';
  }
  const translations = {
    'LPS001': {
      shotId: t('shotId'),
      shotLabel: t('shotLabel'),
      shotProjectId: t('shotProjectId'),
      shotSceneId: t('shotSceneId'),
      shotProjectName: t('projectName'),
      shotSceneName: t('shotSceneName'),
    },
    'LPS002': {
      shotId: t('video_enhance (0/1)'),
      shotLabel: t('video_url'),
      shotProjectId: t('video_width'),
      shotSceneId: t('video_height'),
      shotProjectName: t('fps (1-60, \'original\', default: 25)'),
      shotSceneName: t('ignore, keep empty'),
    }
  };
  return translations[lipsyncProvider][key] || key;
}
