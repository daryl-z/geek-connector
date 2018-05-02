import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";

const getLocation = location => {
  let profileLocation = [];
  if (location instanceof Array) {
    provinces.forEach(province => {
      const matchProvince = province.code === location[0];
      if (matchProvince) {
        profileLocation.push(province.name);
      }
    });

    cities.forEach(city => {
      const matchCity = city.code === location[1];
      if (matchCity) {
        profileLocation.push(city.name);
      }
    });

    areas.forEach(area => {
      const matchArea = area.code === location[2];
      if (matchArea) {
        profileLocation.push(area.name);
      }
    });
  }
  return profileLocation;
};

export default getLocation;
