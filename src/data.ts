interface Season {
  id: number,
  icon: string,
  bg: string,
  sound: string,
}

const data: Season[] = [
  {
    id: 1, icon: 'sun', bg: 'summer', sound: 'summer',
  },
  {
    id: 2, icon: 'cloud-rain', bg: 'rainy', sound: 'rain',
  },
  {
    id: 3, icon: 'cloud-snow', bg: 'winter', sound: 'winter',
  },
];

export {
  data,
};
