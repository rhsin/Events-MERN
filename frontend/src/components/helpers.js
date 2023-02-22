import Geocode from "react-geocode";
import { api_key } from "./constants";

export function convertAddress(address) {
  Geocode.setApiKey(api_key);
  
  Geocode.fromAddress(address)
    .then(res => {
      const { lat, lng } = res.results[0].geometry.location;
      console.log(lat, lng);

      const location = {
        address: address,
        lat: lat,
        lng: lng,
      };
  
      return location
    },
    (err) => {
      console.error(err);
    });
};

