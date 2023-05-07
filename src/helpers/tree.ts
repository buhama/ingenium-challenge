export const getTreeBottomClass = () => {
  const max = 35;
  const min = 20;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  return `${random}%`;
};

export const getTreeRightClass = () => {
  const max = 85;
  const min = 8;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  return `${random}%`;
};

export const getTreeOpacityStyle = (goal: number, progress: number) => {
  if (!goal || !progress) return "0";

  if (progress >= goal) return "1";

  const opacity = progress / goal;

  return `${opacity.toFixed(2)}`;
};
